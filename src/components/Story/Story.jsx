
import "./Story.css";
import propTypes from "prop-types";

function Story({stories}) {

  return (
    <div className="story-bar  border-t  overflow-x-scroll border-gray-900">
      {stories.map((story, index) => (
        <div key={index} className="story flex-none  ">
          <img src={story.userProfilePicture} alt={story} className="w-16 h-16 rounded-full border-2 story-img border-pink-400 hover:border-pink-800 cursor-pointer  " />
          <span>{story.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Story;

Story.propTypes = {
  stories: propTypes.array,
};
