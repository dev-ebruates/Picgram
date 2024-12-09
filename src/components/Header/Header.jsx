import { useNavigate } from "react-router-dom";
import NavButton from "../navButton/NavButton";
import "./Header.css";
import { useState } from "react";
import Modal from "../modal/modal";
import PostForm from "../postFrom/PostForm";

function Header() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = (newPost) => {
    console.log("Yeni gönderi oluşturuldu:", newPost);
    handleCloseModal();
  };

  const handleClick = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <header className="header border-r border-gray-900 h-10 ">
      <div className="logo">
        <h2 className=" italic font-serif text-4xl tracking-tight text-white">
          picgram
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
            <button
              onClick={handleCreateClick}
            >Create</button>
          </li>

          <li>
            <NavButton buttonTitle="Profile" linkTo="/profile" />
          </li>
          <li className="mt-auto">
            <NavButton
              buttonIcon="fas fa-sign-out-alt"
              buttonTitle="Sing Out"
              onClick={() => handleClick()}
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
