import { useState } from "react";
import createPostImage from "../../images/createPostImage.jpg";
import { createPost } from "../../services/postServices";

const PostForm = ({ onSubmit }) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ mediaUrl, caption });
    try {
      var response = await createPost({ mediaUrl, caption });
      alert(response.message);
    } catch (error) {
      alert(error);
    }
    setMediaUrl("");
    setCaption("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-100 w-full">
      {/* Resim Önizlemesi */}
      <div className="w-full flex justify-center mb-4">
        <img
          src={mediaUrl || createPostImage} // Eğer mediaUrl varsa, onu göster, yoksa varsayılan resim kullan
          alt="Create Post"
          className="rounded-md"
          style={{
            width: "250px", // Genişlik ayarı
            height: "auto", // Oran koruma
          }}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-black h-100 w-full max-w-xl"
      >
        <div>
          <label
            htmlFor="media"
            className="block text-sm font-medium text-gray-700 "
          >
            Media URL:
          </label>
          <input
            type="text"
            id="media"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
            className="mt-1 block w-full h-12 rounded-md border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Caption:
          </label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 block w-full h-16 rounded-md border-gray-500 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
        >
          New Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
