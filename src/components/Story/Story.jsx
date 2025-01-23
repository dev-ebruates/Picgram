import { Link } from "react-router-dom";
import "./Story.css";
import propTypes from "prop-types";
import { useGetAllStoriesQuery, useCreateStoryMutation } from "../../features/storyFeatures/storyApi.js";
import {useState } from "react";
import createPostImage from "../../images/createPostImage.jpg";

function Story() {
  const { data: stories, isLoading: storiesLoading, error : storiesError } = useGetAllStoriesQuery();
  const [createStory] = useCreateStoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
 
  const { refetch }  = useGetAllStoriesQuery();
  if (storiesLoading) return <div>Yükleniyor...</div>;
  if (storiesError) return <div>Hata: {storiesError}</div>;

  const handleAddStory = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMediaUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storyData = {
        mediaUrl: mediaUrl
      };
      await createStory(storyData).unwrap();
      setIsModalOpen(false);
      setMediaUrl("");
      await refetch();
    } catch (error) {
      console.error('Story eklenirken hata oluştu:', error);
    }
  };

  return (
    <>
      <div className="left-0 top-0 story-bar overflow-x-scroll border-b border-gray-900">  {/* Kaydırma çubuğu eklendi */}
        <div className="flex  gap-4 ">
          {/* Story Ekleme Butonu */}
          <div className="story flex-none ">
            <div 
              onClick={handleAddStory} 
              className={` w-16 h-16 rounded-full border-2 border-gray-700  cursor-pointer hover:border-gray-300 flex items-center justify-center bg-gray-500 ${storiesLoading ? 'opacity-50' : ''}`}
            >
              {storiesLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500" />
              ) : (
                <span className="text-3xl text-gray-500">+</span>
              )}
            </div>
            <span className="text-sm font-bold text-center -mt-1">
              {storiesLoading ? 'Yükleniyor...' : 'Add'}
            </span>
          </div>

          {/* Mevcut Story'ler */}
          {stories.map((story, index) => (
            <div key={index} className="story flex-none ">
              <Link
                to="/story"
                state={{ 
                  username: story.username,
                  allUsers: stories?.map(story => story.username),
                }}
                className="flex flex-col items-center justify-center "
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-white">Story Add</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full flex justify-center mb-6">
                <img
                  src={mediaUrl || createPostImage}
                  alt="Create Post"
                  className={`w-full h-full object-cover ${mediaUrl ? '' : 'rounded-full'} overflow-hidden border-4 border-gray-800`}
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="media"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Media URL:
                </label>
                <input
                  type="text"
                  id="media"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Media URL'ini girin"
                  className="mt-2 block w-full rounded-md bg-gray-500 border-gray-600 text-white shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm py-2 px-3 border border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-colors duration-300"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Story;
