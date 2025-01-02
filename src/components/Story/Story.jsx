import { Link } from "react-router-dom";
import "./Story.css";
import propTypes from "prop-types";
import { useGetAllStoriesQuery, useCreateStoryMutation } from "../../features/storyFeatures/storyApi.js";
import { useRef } from "react";

function Story() {
  const { data: stories, isLoading: storiesLoading, error : storiesError } = useGetAllStoriesQuery();
  const fileInputRef = useRef(null);

  if (storiesLoading) return <div>Yükleniyor...</div>;
  if (storiesError) return <div>Hata: {storiesError}</div>;


  const handleAddStory = () => {
    fileInputRef.current.click();
  };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     dispatch(setLoading(true));
  //     try {
  //       const formData = new FormData();
  //       formData.append('media', file);

  //       // Story ekleme API'sini çağır
  //       const response = await createStory(formData);
  //       if (response.data) {
  //         dispatch(setStories([...stories, response.data]));
  //       }
  //     } catch (error) {
  //       console.error('Story yüklenirken hata oluştu:', error);
  //       dispatch(setError('Story yüklenirken bir hata oluştu. Lütfen tekrar deneyin.'));
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   }
  // };

  return (
    <div className="story-bar border-t overflow-x-scroll border-gray-900">
      {/* Story Ekleme Butonu */}
      <div className="story flex-none">
        <div 
          onClick={handleAddStory} 
          className={`relative w-16 h-16 rounded-full border-2 border-gray-700  cursor-pointer hover:border-gray-300 flex items-center justify-center bg-gray-500 ${storiesLoading ? 'opacity-50' : ''}`}
        >
          {storiesLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500" />
          ) : (
            <span className="text-3xl text-gray-500">+</span>
          )}
          <input
            type="file"
            ref={fileInputRef}
            // onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
            disabled={storiesLoading}
          />
        </div>
        <span className="text-sm font-bold text-center -mt-1">
          {storiesLoading ? 'Yükleniyor...' : 'Add'}
        </span>
      </div>

      {/* Mevcut Story'ler */}
      {stories.map((story, index) => (
        <div key={index} className="story flex-none">
          <Link
            to="/story"
            state={{ 
              username: story.username,
              allUsers: stories?.map(story => story.username),
            }}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={story.userProfilePicture}
              alt={story.username}
              className="w-16 h-16 rounded-full border-2 story-img border-pink-400 hover:border-pink-800 cursor-pointer"
            />
            <span className="text-sm font-bold text-center mt-1">{story.username}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Story;
