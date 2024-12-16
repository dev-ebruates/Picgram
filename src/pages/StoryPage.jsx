import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllStoriesByUsername } from "../services/storyServices";

const StoryPage = () => {
  const location = useLocation();
  const [username, setUsername] = useState(location.state.username);
  // const stories = location.state.stories;
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    getAllStoriesByUsername(username).then((data) => {
      setUserStories(data.data);
    });
  }, [username]);

  const [currentUserImageIndex, setCurrentUserImageIndex] = useState(0);

  const handle = () =>{
    setUsername("ali");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUserImageIndex((prev) =>
        prev === userStories.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [userStories]);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8">
      {/* Sol Post Ok */}
      <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 focus:outline-none">
        ◀
      </button>

      {/* Story İçeriği */}
      <div className="flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        {/* Görseller */}
        <div className="relative w-full">
          <img
            src={userStories[currentUserImageIndex]?.mediaUrl}
            alt={`Story ${currentUserImageIndex + 1} - Görsel ${
              currentUserImageIndex + 1
            }`}
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Sağ Post Ok */}
      <button onClick={()=>handle()} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 focus:outline-none">
        ▶
      </button>
    </div>
  );
};

export default StoryPage;
