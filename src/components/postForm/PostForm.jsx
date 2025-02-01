import { useState, useRef } from "react";
import createPostImage from "../../images/createPostImage.jpg";
import { useCreatePostMutation } from "../../features/postFeatures/postApi";
import { v4 as uuidv4 } from "uuid";
import { useCreatePictureMutation } from "../../features/pictureFeatures/pictureApi";
const PostForm = ({ handleCloseModal }) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null); // Dosya input referansı

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [createPicture] = useCreatePictureMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ mediaUrl, caption, id: uuidv4() }).unwrap();
      handleCloseModal();
      setMediaUrl("");
      setCaption("");
    } catch (error) {
      alert(error.data?.message || "Bir hata oluştu");
    }
  };

  const handleClick = () => {
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

      if (data.ok) {
        setMediaUrl(import.meta.env.VITE_PICTURE_BASE_URL + "/" + data.data.Url);
      } else {
        alert("Dosya yüklenemedi");
      }
    } catch (error) {
      alert("Dosya yüklenirken hata oluştu");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full h-auto relative"
      style={{ zIndex: 2000 }}
    >
      {/* Resim Önizlemesi */}
      <div className="w-full flex justify-center mb-6 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
        <img
          src={mediaUrl || createPostImage}
          alt="Create Post"
          className="relative w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-lg border-4 border-gray-700 shadow-xl hover:border-gray-600 transition-all duration-300 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <form onSubmit={handleSubmit} className="space-y-6 text-white w-full">
        <div className="space-y-2">
          <label htmlFor="media" className="block text-sm font-medium text-gray-300">
            Media URL
          </label>
          <input
            type="text"
            id="media"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="caption" className="block text-sm font-medium text-gray-300">
            Caption
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[100px]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? "Sharing..." : "Share Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
