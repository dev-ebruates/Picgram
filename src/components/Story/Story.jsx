
import "./Story.css";
import data from "../data/Data.js";


function Story() {

  
  return (
    <div className="story-bar  border-t  overflow-x-scroll border-gray-900">
      {data.map((story, index) => (
        <div key={index} className="story flex-none  ">
          <img src={story.profileImage} alt={story} className="w-16 h-16 rounded-full border-2 story-img border-pink-400 hover:border-pink-800 cursor-pointer  " />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Story;
