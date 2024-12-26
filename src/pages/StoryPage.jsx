import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useGetAllStoriesByUsernameQuery } from "../features/storyFeatures/storyApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setStories, setLoading, setError } from "../features/storyFeatures/storySlice.js";

const StoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stories, isLoading, error } = useSelector((state) => state.story);
  const [username, setUsername] = useState(location.state?.username);
  const [currentUserImageIndex, setCurrentUserImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [allUsers, setAllUsers] = useState(location.state?.allUsers || []);
  const [currentUserIndex, setCurrentUserIndex] = useState(
    allUsers.findIndex(user => user === username) || 0
  );
  const STORY_DURATION = 5000; // 5 saniye

  const { data } = useGetAllStoriesByUsernameQuery(username);

  // Story'leri yükleme
  useEffect(() => {
    if (data) {
      dispatch(setStories(data.data));
    }
    dispatch(setLoading(false));
    if (error) {
      dispatch(setError(error.message));
    }
  }, [data, error, dispatch]);

  // Otomatik story geçişi ve progress bar kontrolü
  useEffect(() => {
    if (stories.length === 0) return;

    setProgress(0); // Her story değişiminde progress'i sıfırla
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);

    const timer = setTimeout(() => {
      handleNextStory();
    }, STORY_DURATION);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentUserImageIndex, stories]);

  // Klavye olaylarını dinleme
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevStory();
      } else if (e.key === "ArrowRight") {
        handleNextStory();
      } else if (e.key === "Escape") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentUserImageIndex, stories.length]);

  const handlePrevStory = () => {
    if (currentUserImageIndex === 0) {
      // İlk story'de ise önceki kullanıcıya geç
      if (currentUserIndex > 0) {
        // Önceki kullanıcıya geç
        const prevUser = allUsers[currentUserIndex - 1];
        setCurrentUserIndex(prev => prev - 1);
        setUsername(prevUser);
        setCurrentUserImageIndex(0);
      }
    } else {
      // Aynı kullanıcının önceki story'sine geç
      setCurrentUserImageIndex(prev => prev - 1);
    }
  };

  const handleNextStory = () => {
    if (currentUserImageIndex === stories.length - 1) {
      // Son story'de ise diğer kullanıcıya geç
      if (currentUserIndex < allUsers.length - 1) {
        // Sonraki kullanıcıya geç
        const nextUser = allUsers[currentUserIndex + 1];
        setCurrentUserIndex(prev => prev + 1);
        setUsername(nextUser);
        setCurrentUserImageIndex(0);
      } else {
        // Tüm kullanıcıların storyleri bitti, ana sayfaya dön
        navigate(-1);
      }
    } else {
      // Aynı kullanıcının diğer story'sine geç
      setCurrentUserImageIndex(prev => prev + 1);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Yükleniyor...</div>;
  if (error) return <div className="text-center mt-10">{error}</div>;
  if (!stories.length) return <div className="text-center mt-10">Hikaye bulunamadı</div>;

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
                src={stories[currentUserImageIndex]?.userProfilePicture}
                alt={username}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="ml-2 text-white font-semibold">{username}</span>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 rounded-full bg-gray-400 overflow-hidden"
                >
                  <div
                    className="h-full bg-white"
                    style={{
                      width: index < currentUserImageIndex ? "100%" : 
                             index === currentUserImageIndex ? `${progress}%` : "0%",
                      transition: "width 100ms linear"
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Görseli */}
            <img
              src={stories[currentUserImageIndex]?.mediaUrl}
              alt={`Story ${currentUserImageIndex + 1}`}
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
