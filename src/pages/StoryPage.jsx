import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllStoriesQuery, useGetAllStoriesByUsernameQuery } from "../features/storyFeatures/storyApi.js";

const StoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const STORY_DURATION = 5000; // 5 saniye

  // Refs kullanarak bazı değişkenleri sabit tut
  const navigateRef = useRef(navigate);
  const storyDurationRef = useRef(STORY_DURATION);

  // Varsayılan state ve fallback mekanizması
  const [storyState, setStoryState] = useState({
    username: location.state?.username || '',
    currentUserImageIndex: 0,
    progress: 0,
    allUsers: location.state?.allUsers || [],
    currentUserIndex: 0,
    userProfilePicture: ''
  });

  // Tüm hikayeleri çek
  const { 
    data: allStories = [], 
    isLoading: allStoriesLoading, 
    error: allStoriesError 
  } = useGetAllStoriesQuery();

  // Username varsa kullanıcı hikayelerini çek
  const { 
    data: userStories = [], 
    isLoading: userStoriesLoading, 
    error: userStoriesError 
  } = useGetAllStoriesByUsernameQuery(storyState.username, {
    skip: !storyState.username
  });

  // Kullanıcıları ve hikayeleri belirle
  useEffect(() => {
    if (allStories.length > 0) {
      const allUsernames = [...new Set(allStories.map(story => story.username))];
      
      setStoryState(prev => ({
        ...prev,
        username: allUsernames[0],
        allUsers: allUsernames,
        currentUserIndex: 0
      }));
    }
  }, [allStories]);

  // Profil resmini çek
  useEffect(() => {
    if (allStories.length > 0) {
      const currentStoryWithProfilePicture = allStories.find(
        story => story.username === storyState.username
      );

      if (currentStoryWithProfilePicture) {
        // Eğer mevcut kullanıcının profil resmi varsa, state'i güncelle
        setStoryState(prevState => ({
          ...prevState,
          userProfilePicture: currentStoryWithProfilePicture.userProfilePicture
        }));
      }
    }
  }, [allStories, storyState.username]);

  // Yükleme ve hata durumlarını kontrol et
  const isLoading = allStoriesLoading || userStoriesLoading;
  const error = allStoriesError || userStoriesError;

  // Geçerli hikayeleri belirle
  const currentStories = userStories.length > 0 ? userStories : allStories;

  // Fonksiyonları memoize et
  const handleNextStory = useCallback(() => {
    setStoryState(prev => {
      const stories = currentStories;
      const allUsers = prev.allUsers.length > 0 
        ? prev.allUsers 
        : [...new Set(stories.map(story => story.username))];

      if (prev.currentUserImageIndex === stories.length - 1) {
        // Son story'de ise diğer kullanıcıya geç
        if (prev.currentUserIndex < allUsers.length - 1) {
          const nextUser = allUsers[prev.currentUserIndex + 1];
          return {
            ...prev,
            currentUserIndex: prev.currentUserIndex + 1,
            username: nextUser,
            currentUserImageIndex: 0,
            allUsers
          };
        } else {
          // Tüm kullanıcıların storyleri bitti, ana sayfaya dön
          navigateRef.current(-1);
          return prev;
        }
      } else {
        // Aynı kullanıcının diğer story'sine geç
        return {
          ...prev,
          currentUserImageIndex: prev.currentUserImageIndex + 1
        };
      }
    });
  }, [currentStories]);

  const handlePrevStory = useCallback(() => {
    setStoryState(prev => {
      const stories = currentStories;
      const allUsers = prev.allUsers.length > 0 
        ? prev.allUsers 
        : [...new Set(stories.map(story => story.username))];

      if (prev.currentUserImageIndex === 0) {
        // İlk story'de ise önceki kullanıcıya geç
        if (prev.currentUserIndex > 0) {
          const prevUser = allUsers[prev.currentUserIndex - 1];
          return {
            ...prev,
            currentUserIndex: prev.currentUserIndex - 1,
            username: prevUser,
            currentUserImageIndex: 0,
            allUsers
          };
        }
        return prev;
      } else {
        // Aynı kullanıcının önceki story'sine geç
        return {
          ...prev,
          currentUserImageIndex: prev.currentUserImageIndex - 1
        };
      }
    });
  }, [currentStories]);

  // Progress ve otomatik geçiş için useEffect
  useEffect(() => {
    if (currentStories.length > 0) {
      let progressTimer;
      let storyTimer;

      // Progress state'ini sıfırla
      setStoryState(prev => ({
        ...prev,
        progress: 0
      }));

      const startProgressTracking = () => {
        const startTime = Date.now();
        
        progressTimer = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const progressPercentage = Math.min(
            100, 
            (elapsedTime / storyDurationRef.current) * 100
          );

          setStoryState(prev => ({
            ...prev,
            progress: progressPercentage
          }));

          // Progress %100'e ulaşınca bir sonraki story'e geç
          if (progressPercentage >= 100) {
            clearInterval(progressTimer);
            handleNextStory();
          }
        }, 50);
      };

      startProgressTracking();

      return () => {
        clearInterval(progressTimer);
      };
    }
  }, [storyState.currentUserImageIndex, currentStories, handleNextStory]);

  // Klavye olaylarını dinleme
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevStory();
      } else if (e.key === "ArrowRight") {
        handleNextStory();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handlePrevStory, handleNextStory]);

  // Geçerli story'yi hesapla
  const currentStory = useMemo(() => {
    return currentStories[storyState.currentUserImageIndex];
  }, [currentStories, storyState.currentUserImageIndex]);

 

  // Yükleme ve hata durumları
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Hikayeler Yüklenemedi</h2>
        <p className="text-gray-600">{error.message || 'Bilinmeyen bir hata oluştu'}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  // Hikayeler yoksa
  if (!currentStories || currentStories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">Hikaye Bulunamadı</h2>
        <p className="text-gray-600">Henüz hikaye yok.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  return (
    <div className="story-page flex flex-col h-screen">
      <div className="logo absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="italic font-serif text-4xl tracking-tight text-white hover:text-gray-300 transition-colors duration-300 bg-transparent border-none cursor-pointer outline-none"
        >
          Picgram
        </button>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center relative">
        <div className="relative w-full max-w-2xl mx-4 mt-16">
          {/* Sol Ok */}
          <button
            onClick={handlePrevStory}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none z-10"
          >
            ←
          </button>

          {/* Story İçeriği */}
          <div className="relative">
            {/* Kullanıcı Bilgisi */}
            <div className="absolute top-4 left-4 flex items-center z-10">
              <img
                src={storyState.userProfilePicture}
                alt={storyState.username}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="ml-2 text-white font-semibold">{storyState.username}</span>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
              {currentStories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 rounded-full bg-gray-400 overflow-hidden"
                >
                  <div
                    className="h-full bg-white"
                    style={{
                      width: index < storyState.currentUserImageIndex ? "100%" : 
                             index === storyState.currentUserImageIndex ? `${storyState.progress}%` : "0%",
                      transition: "width 100ms linear"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Görseli */}
            <img
              src={currentStory?.mediaUrl}
              alt={`Story ${storyState.currentUserImageIndex + 1}`}
              className="w-full h-[80vh] object-contain"
            />
          </div>

          {/* Sağ Ok */}
          <button
            onClick={handleNextStory}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none z-10"
          >
            →
          </button>

          {/* Kapatma Butonu */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 focus:outline-none z-10"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
