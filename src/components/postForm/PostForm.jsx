import { useState } from "react";
import createPostImage from "../../images/createPostImage.jpg";
import { useCreatePostMutation } from "../../features/postFeatures/postApi";
import { v4 as uuidv4 } from "uuid";

const PostForm = ({ handleCloseModal }) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");

  const [createPost, { isLoading }] = useCreatePostMutation();

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

  return (
    <div className="flex flex-col justify-center items-center h-85 w-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl" style={{position: "relative", zIndex: 2000}} >
      {/* Resim Önizlemesi */}
      <div className="w-full flex justify-center mb-6 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
        <img
          src={mediaUrl || createPostImage}
          alt="Create Post"
          className="relative w-[250px] h-[250px] object-cover rounded-lg border-4 border-gray-700 shadow-xl hover:border-gray-600 transition-all duration-300"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-white w-full max-w-xl"
      >
        <div className="space-y-2">
          <label
            htmlFor="media"
            className="block text-sm font-medium text-gray-300"
          >
            Media URL
          </label>
          <input
            type="text"
            id="media"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-300"
          >
            Caption
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[100px]"
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
