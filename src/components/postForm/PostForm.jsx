import { useState } from "react";
import createPostImage from "../../images/createPostImage.jpg";
import { useCreatePostMutation } from "../../features/postFeatures/postApi";
import { useDispatch } from "react-redux";
import { addPost } from "../../features/postFeatures/postSlice";

const PostForm = ({ onSubmit }) => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  
  const dispatch = useDispatch();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost({ mediaUrl, caption }).unwrap();
      dispatch(addPost(response.data));
      onSubmit && onSubmit({ mediaUrl, caption });
      alert(response.message);
      setMediaUrl("");
      setCaption("");
    } catch (error) {
      alert(error.data?.message || 'Bir hata oluştu');
    }
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium text-gray-700"
          >
            Caption:
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? 'Gönderiliyor...' : 'Paylaş'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
