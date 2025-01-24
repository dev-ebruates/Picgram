import { useNavigate, useLocation } from "react-router-dom";
import NavButton from "../navButton/NavButton";
import "./Header.css";
import { useState } from "react";
import Modal from "../modal/modal";
import PostForm from "../postForm/PostForm";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authFeatures/authSlice";
import { resetApiState } from "../../features/baseApi/baseApi";
import SearchSideBar from "../search/searchSideBar.jsx";
import NotificationsSideBar from "../notifications/notificationsSideBar.jsx";
import { useGetMyProfileQuery } from "../../features/userFeatures/userApi.js";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const { data: myProfile } = useGetMyProfileQuery();
  const username = myProfile?.data?.username;

  const handleCreateClick = () => {
    if (location.pathname === `/${username}`) {
      navigate(`/${username}`, { state: { openNewPost: true } });
    } else {
      setIsModalOpen(true);
    }
  };


  const handleLogout = () => {
    // Tüm state'leri temizle
    dispatch(logout());
    dispatch(resetApiState());

    // Login sayfasına yönlendir
    navigate("/login");
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <header className="header border-r border-gray-900 h-10 ">
      <div className="logo">
        <Link to="/">
          <h2 className=" italic font-serif text-4xl tracking-tight text-white">
            Picgram
          </h2>
        </Link>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavButton buttonIcon="fas fa-home" buttonTitle="Home" linkTo="/" />
          </li>
          <li>
            <button
              onClick={toggleSearch}
              className="flex items-center space-x-2 p-2 rounded-md  transition  hover:bg-gray-900 w-12 h-12"
            >
              <i className="fas fa-search  text-2xl"></i>
              <span className="px-2 py-2 mt-1  text-l  text-white ">
                Search
              </span>
            </button>
          </li>
          <li>
            <NavButton
              buttonIcon="fas fa-comment"
              buttonTitle="Message"
              linkTo={"/messages"}
            />
          </li>
          <li>
            <button
              onClick={toggleNotifications}
              className="flex items-center space-x-2 p-2 rounded-md transition hover:bg-gray-900 w-12 h-12"
            >
              <i className="fas fa-heart text-2xl"></i>
              <span className="px-2 py-2 mt-1 text-l text-white">
                Notifications
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={handleCreateClick}
              className="flex items-center space-x-2 p-2 rounded-md  transition  hover:bg-gray-900 w-12 h-12"
            >
              <i className="fas fa-plus  text-3xl"></i>
              <span className="px-2 py-2 mt-1  text-l  text-white ">
                Create
              </span>
            </button>
          </li>
          <li className="ml-auto flex items-center">
            <NavButton
              buttonIcon="fas fa-user"
              buttonTitle="Profile"
              linkTo={`/${username}`}
              profilePicture={myProfile?.data?.userProfilePicture}
            />
          </li>
          {myProfile?.data?.role === 1 && (
            <li>
              <NavButton
                buttonIcon="fas fa-crown"
                buttonTitle="Administrator"
                linkTo="/admin"
              />
            </li>
          )}
          <li className="mt-auto">
            <NavButton
              buttonIcon="fas fa-sign-out-alt"
              buttonTitle="Sign Out"
              onClick={handleLogout}
              linkTo="/login"
            />
          </li>
        </ul>
      </nav>
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
}

export default Header;
