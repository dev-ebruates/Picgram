import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost, deletePost } from "../../features/postFeatures/postSlice";
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikedPostMutation,
} from "../../features/postFeatures/postApi";

function Post({ post }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);

  const [updatePostMutation] = useUpdatePostMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const [likedPostMutation] = useLikedPostMutation();

  const handleUpdatePost = async () => {
    try {
      const response = await updatePostMutation({
        id: post.id,
        caption: editedCaption,
      }).unwrap();

      dispatch(updatePost(response.data));
      setIsEditing(false);
    } catch (error) {
      console.error("Post güncelleme hatası:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePostMutation(post.id).unwrap();
      dispatch(deletePost(post.id));
    } catch (error) {
      console.error("Post silme hatası:", error);
    }
  };

  const handleLikePost = async () => {
    try {
      await likedPostMutation(post.id).unwrap();
    } catch (error) {
      console.error("Beğeni hatası:", error);
    }
  };

  // Tarih formatlaması
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return formatDistanceToNow(date, { locale: enUS, addSuffix: true });
    } catch (error) {
      console.error("Tarih formatlama hatası:", error);
      return "";
    }
  };

  return (
    <div className="max-w-md mx-auto my-5 border border-black rounded-lg shadow-md bg-black border-b-gray-900">
      {/* Profil Bilgileri */}
      <div className="flex items-center px-4 py-3 ">
        <Link to={`/${post.username}`}>
          {" "}
          <img
            src={post.userProfilePicture || "https://via.placeholder.com/40"}
            alt="Profil Resmi"
            className="w-16 h-16 rounded-full"
          />
        </Link>

        <div className="ml-3">
          <p className="font-semibold">{post.username}</p>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      {/* Gönderi Resmi */}
      <img
        src={post.mediaUrl}
        alt="Gönderi Resmi"
        className="w-full h-max object-cover"
      />

      {/* Etkileşim Butonları */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-4">
            <button onClick={handleLikePost}>
              <i
                className={`${post.isLiked ? "fas" : "far"} fa-heart text-2xl ${
                  post.isLiked ? "text-red-500" : "text-white"
                }`}
              ></i>
            </button>
            <button>
              <i className="far fa-comment text-2xl"></i>
            </button>
          </div>
          {post.likeCount > 0 && (
            <p className="text-white text-sm">{post.likeCount} likes</p>
          )}
        </div>
      </div>

      {/* Açıklama ve Yorum */}
      <div className="px-4 pb-4">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              className="flex-1 bg-gray-800 text-white p-2 rounded"
            />
            <button
              onClick={handleUpdatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Kaydet
            </button>
          </div>
        ) : (
          <p>
            <span className="font-semibold">{post.username} </span>
            {post.caption}
          </p>
        )}

        {post.isOwner && (
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-400 hover:text-white"
            >
              <i className="far fa-edit text-xl"></i>
            </button>
            <button
              onClick={handleDeletePost}
              className="text-gray-400 hover:text-white"
            >
              <i className="far fa-trash-alt text-xl"></i>
            </button>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-2">View all 10 comments</p>
      </div>
    </div>
  );
}

export default Post;
