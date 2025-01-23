import { useState, useEffect, useRef } from "react";
import {
  useCreatePostCommentMutation,
  useDeletePostCommentMutation,
} from "../features/postFeatures/postApi.js";
import { useGetMyProfileQuery } from "../features/userFeatures/userApi.js";
import { useGetAllPostsQuery } from "../features/postFeatures/postApi.js";
import { v4 as uuidv4 } from "uuid";

const CommentsPage = ({ handleCloseModal, post }) => {
  const [newComment, setNewComment] = useState("");
  const commentsEndRef = useRef(null);
  const { data: profileData } = useGetMyProfileQuery();
  const { data: posts, isLoading, error, refetch } = useGetAllPostsQuery();
  const [createPostComment] = useCreatePostCommentMutation();
  const [deletePostCommentMutation] = useDeletePostCommentMutation();
  const username = profileData?.data?.username;

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createPostComment({
        postId: post.id,
        comment: newComment,
        id: uuidv4(),
      });
      setNewComment("");
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    deletePostCommentMutation({ postId, commentId })
      .then(() => {
        refetch(); // Yorum silindikten sonra postları güncelle
      })
      .catch((error) => {
        console.error("Yorum silinirken hata oluştu:", error);
      });
  };
  

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [post.comments]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-black rounded-lg shadow-lg w-3/4 h-3/4 p-6 relative flex flex-col space-y-6">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 text-white hover:text-gray-400 transition duration-200 text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 h-full">
          {/* Media Preview */}
          <div className="w-[450px] h-[450px] flex justify-center items-center">
            <img
              src={post.mediaUrl}
              alt="Post"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Comments Section */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4 h-full">
            <div className="flex items-center space-x-3">
              <img
                src={post.userProfilePicture || "https://via.placeholder.com/50"}
                alt={`${post.username} profile`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <h2 className="text-white text-lg font-semibold">
                {post.username}
              </h2>
            </div>
            <div className="text-center mt-4">
              <h2 className="text-white text-lg font-semibold">Yorumlar</h2>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[300px] space-y-3 bg-black p-3 rounded-lg shadow-inner">
              {post.comments
                ?.slice() // Orijinal diziyi değiştirmemek için kopyasını oluşturuyoruz
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Tarihe göre sıralama (eski -> yeni)
                .map((comment) => (
                  <div
                    key={comment?.id}
                    className="flex items-start space-x-3 bg-black border border-gray-900 p-2 rounded-lg text-white"
                  >
                    <img
                      src={
                        comment?.profilePicture ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm block">
                          {comment?.username}
                        </span>
                        {comment?.username === username && (
                          <button
                            onClick={() => handleDeleteComment(post.id,comment.id)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-300">{comment?.comment}</p>
                      <div className="flex justify-end">
                        <span className="text-xs text-gray-500">
                          {new Date(comment?.createdAt).toLocaleDateString(
                            "tr-TR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              <div ref={commentsEndRef} />
            </div>

            {/* Comment Input */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex items-center bg-gray-700 p-2 rounded-lg"
            >
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Yorum ekle..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none px-2"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`ml-2 px-4 py-1 rounded text-sm font-semibold ${
                  newComment.trim()
                    ? "bg-gray-600 hover:bg-gray-800 text-white"
                    : "bg-gray-500 text-gray-300 cursor-not-allowed"
                }`}
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
