import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useGetAllNotificationByUserIdQuery } from "../../features/notifications/notificationsApi.js";
import { Link } from "react-router-dom";

const notificationsSideBar = ({ isOpen, onClose }) => {
  const { data, error, isLoading } = useGetAllNotificationByUserIdQuery();

  const getUTCOffset = (date) => {
    const offset = new Date().getTimezoneOffset();
    var utcOffset = `${offset > 0 ? "-" : "+"}${Math.abs(offset) / 60}`;
    return new Date(date).setHours(new Date(date).getHours() + parseInt(utcOffset))
  };

  const getNotificationText = (type, username) => {
    switch (type) {
      case 1:
        return (
          <>
            <Link
              to={`/${username}`}
              className="hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-sm text-gray-200">
                {username}{" "}
              </span>
            </Link>
            <span className="text-gray-400 text-xs">liked your post</span>
          </>
        );
      case 2:
        return (
          <>
            <Link
              to={`/${username}`}
              className="hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-sm text-gray-200">
                {username}{" "}
              </span>
            </Link>
            <span className="text-gray-400 text-xs">
              commented on your post
            </span>
          </>
        );
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-gray-500 p-4 text-center bg-black">
        Error loading notifications
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: isOpen ? 0 : "-100%", opacity: isOpen ? 1 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 left-0 w-[270px] h-full bg-gradient-to-br from-black via-black to-gray-900 shadow-2xl overflow-y-auto rounded-r-xl z-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-200">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-300 transition-colors rounded-full p-2 hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        {data && data.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No notifications yet
          </div>
        )}

        <div className="space-y-4">
          {data &&
            data
              .slice()
              .reverse()
              .map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors group cursor-pointer"
                >
                  <div className="flex-1 mr-4">
                    <span className="text-gray-200 text-sm">
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
                      className="w-16 h-16 object-cover rounded-lg mb-1 group-hover:scale-105 transition-transform border border-gray-800"
                    />
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(getUTCOffset(notification.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </motion.div>
  );
};

export default notificationsSideBar;
