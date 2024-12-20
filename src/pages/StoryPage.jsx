import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllStoriesByUsernameQuery } from "../features/storyFeatures/storyApi.js";

const StoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username);
  const [userStories, setUserStories] = useState([]);
  const [currentUserImageIndex, setCurrentUserImageIndex] = useState(0);
  const STORY_DURATION = 5000; // 5 saniye

  const { data, isLoading } = useGetAllStoriesByUsernameQuery(username);

  // Story'leri yükleme
  useEffect(() => {
    if (data) {
      setUserStories(data.data);
    }
  }, [data]);

  // Otomatik story geçişi
  useEffect(() => {
    if (userStories.length === 0) return;

    const timer = setTimeout(() => {
      handleNextStory();
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [currentUserImageIndex, userStories]);

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
  }, [currentUserImageIndex, userStories.length]);

  const handlePrevStory = () => {
    setCurrentUserImageIndex((prev) =>
      prev === 0 ? userStories.length - 1 : prev - 1
    );
  };

  const handleNextStory = () => {
    if (currentUserImageIndex === userStories.length - 1) {
      // Son story'de ise ana sayfaya dön
      navigate(-1);
    } else {
      setCurrentUserImageIndex((prev) => prev + 1);
    }
  };

  if (isLoading) return <div className="text-center mt-10">Yükleniyor...</div>;
  if (!userStories.length) return <div className="text-center mt-10">Hikaye bulunamadı</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-4">
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
              src={userStories[currentUserImageIndex]?.userProfilePicture}
              alt={username}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="ml-2 text-white font-semibold">{username}</span>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
            {userStories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 rounded-full bg-gray-400 overflow-hidden"
              >
                <div
                  className="h-full bg-white"
                  style={{
                    width: index < currentUserImageIndex ? "100%" : 
                          index === currentUserImageIndex ? "0%" : "0%",
                    transition: index === currentUserImageIndex ? "width 5s linear" : "none",
                    ...(index === currentUserImageIndex && {
                      animation: "progress 5s linear forwards"
                    })
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Görseli */}
          <img
            src={userStories[currentUserImageIndex]?.mediaUrl}
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
  );
};

export default StoryPage;
