import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLikedPostMutation } from "../../features/postFeatures/postApi";
import Comments from "./Comments";

function Post({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isFullCaptionVisible, setIsFullCaptionVisible] = useState(false);

  const [likedPostMutation] = useLikedPostMutation();

  const handleLikePost = async () => {
    try {
      await likedPostMutation(post.id).unwrap();
    } catch (error) {
      console.error("Beğeni hatası:", error);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const commentToAdd = {
        id: `temp-${Date.now()}`,
        comment: newComment,
        username: "currentUser", // Gerçek kullanıcı adı ile değiştirilmeli
        profilePicture: "https://via.placeholder.com/40", // Gerçek profil resmi ile değiştirilmeli
        createdAt: new Date().toISOString(),
      };

      setComments([...comments, commentToAdd]);
      setNewComment("");
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

  // Caption'ı kırp ve "Devamını oku" özelliği ekle
  const renderCaption = () => {
    const maxLength = 40;
    if (post.caption.length <= maxLength || isFullCaptionVisible) {
      return post.caption;
    }
    return (
      <>
        {post.caption.slice(0, maxLength)}...{" "}
        <button
          onClick={() => setIsFullCaptionVisible(true)}
          className="text-blue-500 hover:text-blue-400"
        >
         read more...
        </button>
      </>
    );
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
      <div className="px-4 pb-4 max-w-md mx-auto">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              className="flex-1 bg-gray-800 text-white p-2 rounded"
            />
          </div>
        ) : (
          <p className="max-w-full overflow-hidden text-ellipsis">
            <span className="font-semibold">{post.username} </span>
            {renderCaption()}
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
          </div>
        )}

        {/* Yorum Ekleme Alanı */}
        <form
          onSubmit={handleAddComment}
          className="mt-2 flex items-center space-x-2"
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="write your comment..."
            className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>

        {/* Yorumları Göster */}
        <Comments comments={comments} />
      </div>
    </div>
  );
}

export default Post;
