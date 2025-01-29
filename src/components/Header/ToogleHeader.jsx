import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../modal/modal";
import PostForm from "../postForm/PostForm";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authFeatures/authSlice";
import { resetApiState } from "../../features/baseApi/baseApi";
import SearchSideBar from "../search/searchSideBar.jsx";
import NotificationsSideBar from "../notifications/notificationsSideBar.jsx";
import { useGetMyProfileQuery } from "../../features/userFeatures/userApi.js";
import { Link } from "react-router-dom";

const ToogleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const { data: myProfile } = useGetMyProfileQuery();
  const username = myProfile?.data?.username;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetApiState());
    navigate("/login");
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleNotifications = () =>
    setIsNotificationsOpen(!isNotificationsOpen);

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-black shadow-md z-50 px-4">
      <div className="flex justify-between items-center p-2 text-white">
        <Link to={"/"}>
        <div className="italic font-serif text-2xl tracking-tight text-white pl-2">
          Picgram
        </div>
        </Link>
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 mr-4 rounded-md bg-gray-600 hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="bg-black text-white p-3 lg:hidden">
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <Link to="/" className="block flex items-center">
                <div>
                  <i className="fas fa-home text-lg mr-2"></i>
                  <span className="text-lg">Home</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Link className="block" onClick={toggleSearch}>
                <div>
                  <i className="fas fa-search text-lg mr-2"></i>
                  <span className="text-lg">Search</span>
                </div>
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <Link to="/messages" className="block">
                <div>
                  <i className="fas fa-comment text-lg mr-2"></i>
                  <span className="text-lg">Message</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className="block" onClick={toggleNotifications}>
                <div>
                  <i className="fas fa-heart text-lg mr-2"></i>
                  <span className="text-lg">Notifications</span>
                </div>
              </Link>
            </li>
            {myProfile?.data?.role === 1 && (
              <li>
                <Link to="/admin" className="block">
                  <div>
                    <i className="fas fa-crown text-lg mr-2"></i>
                    <span className="text-lg">Administrator</span>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link to={`/${username}`} className="block">
                <div>
                  <i className="fas fa-user text-lg mr-2"></i>
                  <span className="text-lg">Profile</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/login" className="block" onClick={handleLogout}>
                <div>
                  <i className="fas fa-sign-out-alt text-lg mr-2"></i>
                  <span className="text-lg">Logout</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PostForm handleCloseModal={() => setIsModalOpen(false)} />
      </Modal>

      <SearchSideBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <NotificationsSideBar
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </header>
  );
};

export default ToogleHeader;
