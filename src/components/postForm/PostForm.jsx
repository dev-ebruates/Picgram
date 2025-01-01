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
    <div className="flex flex-col justify-center items-center h-100 w-full bg-gray-900  p-6 rounded-lg">
      {/* Resim Önizlemesi */}
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
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-white w-full max-w-xl"
      >
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
            className="mt-2 block w-full rounded-md bg-gray-500 border-gray-600 text-white shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm py-2 px-3 border border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Caption:
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-2 block w-full rounded-md bg-gray-500 border-gray-600 text-white shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm py-2 px-3 min-h-[100px] border border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-colors duration-300"
        >
          {isLoading ? "Gönderiliyor..." : "Share"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
