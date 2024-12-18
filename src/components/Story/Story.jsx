import { Link } from "react-router-dom";
import "./Story.css";
import propTypes from "prop-types";
import { useGetAllStoriesQuery } from "../../features/storyFeatures/storyApi.js";
import { useEffect, useState } from "react";

function Story() {
  const { data, isLoading, error } = useGetAllStoriesQuery();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (data) {
      setStories(data.data); // RTK Query'den gelen veriyi state'e kopyala
    }
  }, [data]); 
 
  return (
    <div className="story-bar  border-t  overflow-x-scroll border-gray-900">
      {stories.map((story, index) => (
        <div key={index} className="story flex-none  ">
          <Link
           to="/story"
            state={{ username: story.username, stories: {stories} }} // State gönderimi
          >
            <img
              src={story.userProfilePicture}
              alt={story}
              className="w-16 h-16 rounded-full border-2 story-img border-pink-400 hover:border-pink-800 cursor-pointer  "
            />
            <span>{story.username}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Story;

Story.propTypes = {
  stories: propTypes.array,
};
