import { Link } from "react-router-dom";
import "./Story.css";
import {
  useGetAllStoriesQuery,
  useCreateStoryMutation,
} from "../../features/storyFeatures/storyApi.js";
import { useState } from "react";
import createPostImage from "../../images/createPostImage.jpg";
import { useRef } from "react";
import { useCreatePictureMutation } from "../../features/pictureFeatures/pictureApi.js";

function Story() {
  const {
    data: stories,
    isLoading: storiesLoading,
    error: storiesError,
  } = useGetAllStoriesQuery();
  const [createStory] = useCreateStoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const fileInputRef = useRef(null); // Dosya input referansı

  const [createPicture] = useCreatePictureMutation();
  const { refetch } = useGetAllStoriesQuery();
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
        mediaUrl: mediaUrl,
      };
      await createStory(storyData).unwrap();
      setIsModalOpen(false);
      setMediaUrl("");
      await refetch();
    } catch (error) {
      console.error("Story eklenirken hata oluştu:", error);
    }
  };

  const handleClickStory = () => {
    fileInputRef.current.click(); // Dosya seçme penceresini aç
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const data = await createPicture(formData).unwrap();
      console.log(data);

      if (data.success) {
        setMediaUrl(
          import.meta.env.VITE_PICTURE_BASE_URL + "/" + data.data.url
        );
      } else {
        alert("Dosya yüklenemedi");
      }
    } catch (error) {
      alert("Dosya yüklenirken hata oluştu");
    }
  };

  return (
    <>
      <div className="w-[600px] max-w-full overflow-x-auto px-4">
        <div className="flex gap-4 min-w-max">
          {/* Story Ekleme Butonu */}
          <div className="story flex-none group">
            <div
              onClick={handleAddStory}
              className={`w-16 h-16 rounded-full p-0.5 cursor-pointer 
                bg-gradient-to-br from-purple-600 to-pink-500 
                hover:from-purple-500 hover:to-pink-400 
                transform hover:scale-105 transition-all duration-300
                ${storiesLoading ? "opacity-50" : ""}`}
            >
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                {storiesLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500" />
                ) : (
                  <span className="text-3xl text-purple-500 group-hover:text-purple-400 transition-colors">
                    +
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm font-bold text-center mt-1 text-gray-300 group-hover:text-purple-400 transition-colors">
              {storiesLoading ? "Yükleniyor..." : ""}
            </span>
          </div>

          {/* Mevcut Story'ler */}
          {stories.map((story, index) => (
            <div key={index} className="story flex-none ">
              <Link
                to="/story"
                state={{
                  username: story.username,
                  allUsers: stories?.map((story) => story.username),
                }}
                className="flex flex-col items-center justify-center "
              >
                <img
                  src={story.userProfilePicture}
                  alt={story.username}
                  className="w-16 h-16 rounded-full border-2 story-img border-purple-400  hover:border-purple-800 cursor-pointer"
                />
                <span className="text-sm font-bold text-center mt-1">
                  {story.username}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 rounded-lg p-6 w-[400px] border border-gray-800/50 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Story Add
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full flex justify-center mb-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <img
                      src={mediaUrl || createPostImage}
                      alt="Create Post"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-800 transition-all duration-300 group-hover:scale-[1.02]"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      onClick={handleClickStory}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="media"
                  className="block text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  Media URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="media"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="Enter media URL..."
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700/50 rounded-lg text-white 
                    placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-purple-500/20
                    transition-all duration-300 text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-800/80 text-white rounded-lg border border-gray-700/50
                  hover:bg-gray-700/80 transition-all duration-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                  font-medium hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/20 
                  transition-all duration-300 text-sm"
                >
                  Add Story
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
