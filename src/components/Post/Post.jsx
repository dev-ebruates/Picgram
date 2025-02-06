import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLikedPostMutation } from "../../features/postFeatures/postApi";
import Modal from "../modal/modal";
import CommentsPage from "../../pages/CommentsPage";

function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullCaptionVisible, setIsFullCaptionVisible] = useState(false);

  const [likedPostMutation] = useLikedPostMutation();
  // const navigate = useNavigate();

  const handleLikePost = async () => {
    try {
      await likedPostMutation(post?.id).unwrap();
    } catch (error) {
      console.error("Beğeni hatası:", error);
    }
  };
  const handleCommentClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleCommentClick = () => {
  //   navigate(`/comments?mediaUrl=${post.mediaUrl}`); // Yorum sayfasına yönlendirme
  // };

  // Tarih formatlaması
  const getUTCOffset = (date) => {
    const offset = new Date().getTimezoneOffset();
    var utcOffset = `${offset > 0 ? "-" : "+"}${Math.abs(offset) / 60}`;
    return new Date(date).setHours(new Date(date).getHours() + parseInt(utcOffset))
  };
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return formatDistanceToNow(getUTCOffset(date), { locale: enUS, addSuffix: true });
    } catch (error) {
      console.error("Tarih formatlama hatası:", error);
      return "";
    }
  };

  // Caption'ı kırp ve "Devamını oku" özelliği ekle
  const renderCaption = () => {
    const maxLength = 40;
    if (post?.caption?.length <= maxLength || isFullCaptionVisible) {
      return post?.caption;
    }
    return (
      <>
        {post?.caption?.slice(0, maxLength)}...{" "}
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
      <div className="flex items-center px-4 py-3">
        <Link to={`/${post?.username}`}>
          <img
            src={
              post?.userProfilePicture
            }
            alt="Profil Resmi"
            className="w-16 h-16 rounded-full"
          />
        </Link>
        <div className="ml-3">
          <p className="font-semibold">{post?.username}</p>
          <p className="text-sm text-gray-500">{getUTCOffset(post?.createdAt)}</p>
        </div>
      </div>

      {/* Gönderi Resmi */}
      <div className="w-full h-80 overflow-hidden">
        <img
          src={post?.mediaUrl}
          alt="Gönderi Resmi"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Etkileşim Butonları */}
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <button onClick={handleLikePost}>
              <i
                className={`${
                  post?.isLiked ? "fas" : "far"
                } fa-heart text-2xl ${
                  post?.isLiked ? "text-red-500" : "text-white"
                }`}
              ></i>
            </button>
            {post?.likeCount > 0 && (
              <span className="text-white text-sm ml-2">
                {post?.likeCount} {post?.likeCount > 1 ? "likes" : "like"}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <button onClick={handleCommentClick}>
              <i className="far fa-comment text-2xl text-white"></i>
            </button>
            {post?.comments?.length > 0 && (
              <span className="text-white text-sm ml-2">
                {post?.comments?.length}{" "}
                {post?.comments?.length > 1 ? "comments" : "comment"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 max-w-md mx-auto">
        <p className="max-w-full overflow-hidden text-ellipsis">
          <span className="font-semibold">{post.username} </span>
          {renderCaption()}
        </p>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CommentsPage handleCloseModal={handleCloseModal} post={post} />
        </Modal>
      </div>
    </div>
  );
}

export default Post;
