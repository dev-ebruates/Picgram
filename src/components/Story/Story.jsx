import { Link } from "react-router-dom";
import "./Story.css";
import propTypes from "prop-types";
import { useGetAllStoriesQuery, useCreateStoryMutation } from "../../features/storyFeatures/storyApi.js";
import { useEffect, useState, useRef } from "react";

function Story() {
  const { data, isLoading, error } = useGetAllStoriesQuery();
  const [createStory] = useCreateStoryMutation();
  const [stories, setStories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data && data.data !== stories) {
      setStories(data.data);
    }
  }, [data, stories]);

  // Story'si olan tüm kullanıcıların listesini oluştur
  const allUsersWithStories = stories.map(story => story.username);

  const handleAddStory = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('media', file);

        // Story ekleme API'sini çağır
        const response = await createStory(formData);
        if (response.data) {
          // Story başarıyla eklendi, listeyi güncelle
          setStories(prevStories => [...prevStories, response.data]);
        }
      } catch (error) {
        console.error('Story yüklenirken hata oluştu:', error);
        alert('Story yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="story-bar border-t overflow-x-scroll border-gray-900">
      {/* Story Ekleme Butonu */}
      <div className="story flex-none">
        <div 
          onClick={handleAddStory} 
          className={`relative w-16 h-16 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-400 flex items-center justify-center bg-gray-100 ${isUploading ? 'opacity-50' : ''}`}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500" />
          ) : (
            <span className="text-3xl text-gray-500">+</span>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
            disabled={isUploading}
          />
        </div>
        <span className="text-center block mt-1">
          {isUploading ? 'Yükleniyor...' : 'Story Ekle'}
        </span>
      </div>

      {/* Mevcut Story'ler */}
      {stories.map((story, index) => (
        <div key={index} className="story flex-none">
          <Link
            to="/story"
            state={{ 
              username: story.username,
              allUsers: allUsersWithStories,
            }}
          >
            <img
              src={story.userProfilePicture}
              alt={story.username}
              className="w-16 h-16 rounded-full border-2 story-img border-pink-400 hover:border-pink-800 cursor-pointer"
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
