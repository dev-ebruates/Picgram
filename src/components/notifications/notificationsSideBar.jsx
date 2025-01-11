import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useGetAllNotificationByUserIdQuery } from "../../features/notifications/notificationsApi.js";
import { Link } from "react-router-dom";

const notificationsSideBar = ({ isOpen, onClose }) => {
  const { data, error, isLoading } = useGetAllNotificationByUserIdQuery();

  const getNotificationText = (type, username) => {
    switch (type) {
      case 1:
        return (
          <>
            <Link to={`/${username}`}>
              <span className="font-bold text-sm">{username} </span>
            </Link>

            <span className="text-gray-300 text-xs">liked your post</span>
          </>
        );
      case 2:
        return (
          <>
            <Link to={`/${username}`}>
              <span className="font-bold text-sm">{username} </span>
            </Link>
            <span className="text-gray-300 text-xs">
              commented on your post
            </span>
          </>
        );
      default:
        return "";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Notification Error Details:", error);
    return <div>Error loading notifications</div>;
  }

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "tween" }}
      className="fixed top-0 left-0 w-[270px] h-full bg-black shadow-lg z-50 overflow-y-auto search-sidebar"
    >
      <div className="p-4 search-sidebar-content">
        <div className="flex justify-between items-center mb-4 search-sidebar-header">
          <h2 className="text-xl font-bold mt-4 ml-2">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 search-sidebar-close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {data &&
            data.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div className="flex-1">
                  <span className="text-white">
                    {getNotificationText(
                      notification.type,
                      notification.triggerUsername
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={notification.mediaUrl}
                    alt="Post"
                    className="w-14 h-14 object-cover rounded mb-1"
                  />
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default notificationsSideBar;
