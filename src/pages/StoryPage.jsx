import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  useGetAllStoriesQuery,
  useGetAllStoriesByUsernameQuery,
} from "../features/storyFeatures/storyApi.js";

const StoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const STORY_DURATION = 5000; // 5 saniye

  const navigateRef = useRef(navigate);
  const storyDurationRef = useRef(STORY_DURATION);

  const [storyState, setStoryState] = useState({
    username: location.state?.username || "",
    currentUserImageIndex: 0,
    progress: 0,
    allUsers: location.state?.allUsers || [],
    currentUserIndex: 0,
    userProfilePicture: "",
  });

  const {
    data: allStories = [],
    isLoading: allStoriesLoading,
    error: allStoriesError,
  } = useGetAllStoriesQuery();

  const {
    data: userStories = [],
    isLoading: userStoriesLoading,
    error: userStoriesError,
  } = useGetAllStoriesByUsernameQuery(storyState.username, {
    skip: !storyState.username,
  });

  useEffect(() => {
    if (allStories.length > 0) {
      const allUsernames = [
        ...new Set(allStories.map((story) => story.username)),
      ];
      const selectedUserIndex = location.state?.username
        ? allUsernames.indexOf(location.state.username)
        : 0;

      setStoryState((prev) => ({
        ...prev,
        username: location.state?.username || allUsernames[0],
        allUsers: allUsernames,
        currentUserIndex: selectedUserIndex >= 0 ? selectedUserIndex : 0,
      }));
    }
  }, [allStories, location.state?.username]);

  useEffect(() => {
    if (allStories.length > 0) {
      const currentStoryWithProfilePicture = allStories.find(
        (story) => story.username === storyState.username
      );

      if (currentStoryWithProfilePicture) {
        setStoryState((prevState) => ({
          ...prevState,
          userProfilePicture: currentStoryWithProfilePicture.userProfilePicture,
        }));
      }
    }
  }, [allStories, storyState.username]);

  const isLoading = allStoriesLoading || userStoriesLoading;
  const error = allStoriesError || userStoriesError;

  const currentStories = userStories.length > 0 ? userStories : allStories;

  const handleNextStory = useCallback(() => {
    setStoryState((prev) => {
      const stories = currentStories;
      const allUsers =
        prev.allUsers.length > 0
          ? prev.allUsers
          : [...new Set(stories.map((story) => story.username))];

      if (prev.currentUserImageIndex === stories.length - 1) {
        if (prev.currentUserIndex < allUsers.length - 1) {
          const nextUser = allUsers[prev.currentUserIndex + 1];
          return {
            ...prev,
            currentUserIndex: prev.currentUserIndex + 1,
            username: nextUser,
            currentUserImageIndex: 0,
            allUsers,
          };
        } else {
          navigateRef.current(-1);
          return prev;
        }
      } else {
        return {
          ...prev,
          currentUserImageIndex: prev.currentUserImageIndex + 1,
        };
      }
    });
  }, [currentStories]);

  const handlePrevStory = useCallback(() => {
    setStoryState((prev) => {
      const stories = currentStories;
      const allUsers =
        prev.allUsers.length > 0
          ? prev.allUsers
          : [...new Set(stories.map((story) => story.username))];

      if (prev.currentUserImageIndex === 0) {
        if (prev.currentUserIndex > 0) {
          const prevUser = allUsers[prev.currentUserIndex - 1];
          return {
            ...prev,
            currentUserIndex: prev.currentUserIndex - 1,
            username: prevUser,
            currentUserImageIndex: 0,
            allUsers,
          };
        }
        return prev;
      } else {
        return {
          ...prev,
          currentUserImageIndex: prev.currentUserImageIndex - 1,
        };
      }
    });
  }, [currentStories]);

  useEffect(() => {
    if (currentStories.length > 0) {
      let progressTimer;

      setStoryState((prev) => ({
        ...prev,
        progress: 0,
      }));

      const startProgressTracking = () => {
        const startTime = Date.now();

        progressTimer = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const progressPercentage = Math.min(
            100,
            (elapsedTime / storyDurationRef.current) * 100
          );

          setStoryState((prev) => ({
            ...prev,
            progress: progressPercentage,
          }));

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

  const currentStory = useMemo(() => {
    return currentStories[storyState.currentUserImageIndex];
  }, [currentStories, storyState.currentUserImageIndex]);

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
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Hikayeler Yüklenemedi
        </h2>
        <p className="text-gray-600">
          {error.message || "Bilinmeyen bir hata oluştu"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  if (!currentStories || currentStories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">
          Hikaye Bulunamadı
        </h2>
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
    <div className="relative w-screen h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-start bg-gradient-to-b from-black/50 to-transparent">
        <Link
          to="/"
          className="hidden sm:block italic font-serif text-4xl tracking-tight text-white hover:text-gray-300 transition-colors duration-300"
        >
          Picgram
        </Link>
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-300 text-2xl absolute top-0 right-0 p-4"
        >
          ×
        </button>
      </div>

      <div className="story-page flex flex-col h-screen">
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center relative">
          <div className="relative w-full max-w-2xl mx-4 mt-16 lg:mt-4 lg:mx-auto">
            <button
              onClick={handlePrevStory}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none z-[60]"
            >
              ←
            </button>

            <div className="relative">
              <div className="absolute top-4 left-4 flex items-center">
                <img
                  src={storyState.userProfilePicture}
                  alt={storyState.username}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="ml-2 text-white font-semibold">
                  {storyState.username}
                </span>
              </div>

              <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 border-t border-gray-900">
                {currentStories.map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-1 rounded-full bg-gray-400 overflow-hidden"
                  >
                    <div
                      className="h-full bg-white"
                      style={{
                        width:
                          index < storyState.currentUserImageIndex
                            ? "100%"
                            : index === storyState.currentUserImageIndex
                            ? `${storyState.progress}%`
                            : "0%",
                        transition: "width 100ms linear",
                      }}
                    />
                  </div>
                ))}
              </div>

              <img
                src={currentStory?.mediaUrl}
                alt={`Story ${storyState.currentUserImageIndex + 1}`}
                className="w-full h-[80vh] md:h-[70vh] lg:h-[60vh] object-contain"
              />
            </div>

            <button
              onClick={handleNextStory}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none z-[60]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
