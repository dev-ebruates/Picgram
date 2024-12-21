import { useNavigate } from "react-router-dom";
import NavButton from "../navButton/NavButton";
import "./Header.css";
import { useState } from "react";
import Modal from "../modal/modal";
import PostForm from "../postForm/PostForm";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authFeatures/authSlice";
import { clearUserData } from "../../features/userFeatures/userSlice";
import { resetApiState } from "../../features/baseApi/baseApi";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = (newPost) => {
    handleCloseModal();
  };

  const handleLogout = () => {
    // Tüm state'leri temizle
    dispatch(logout());
    dispatch(clearUserData());
    dispatch(resetApiState());
    
    // Login sayfasına yönlendir
    navigate("/login");
  };

  return (
    <header className="header border-r border-gray-900 h-10 ">
      <div className="logo">
        <h2 className=" italic font-serif text-4xl tracking-tight text-white">
          Picgram
        </h2>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <NavButton buttonIcon="fas fa-home" buttonTitle="Home" linkTo="/" />
          </li>
          <li>
            <NavButton
              buttonIcon="fas fa-comment"
              buttonTitle="Message"
              linkTo={"/"}
            />
          </li>
          <li>
            <NavButton
              buttonIcon="fas fa-search"
              buttonTitle="Search"
              linkTo={"/"}
            />
          </li>
          <li>
            <NavButton
              buttonIcon="fas fa-heart"
              buttonTitle="Notifications"
              linkTo={"/"}
            />
          </li>
          <li>
            <button onClick={handleCreateClick} className="flex items-center space-x-2 p-2 rounded-md  transition  hover:bg-gray-900 w-12 h-12">
              <i className="fas fa-plus  text-2xl"></i>
              <span className="px-2 py-2 mt-1  text-l  text-white ">
               Create
              </span>
            </button>
          </li>

          <li>
            <NavButton buttonTitle="Profile" linkTo="/profile" />
          </li>
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
      {/* Modal Bileşeni */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PostForm onSubmit={handlePostSubmit} />
      </Modal>
    </header>
  );
}

export default Header;
