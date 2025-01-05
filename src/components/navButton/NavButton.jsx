import { Link } from "react-router-dom";

const NavButton = ({ buttonIcon, buttonTitle, onClick, linkTo ,profilePicture }) => {
  return (
    <Link to={`${linkTo} `}>
      <button
        type="button"
        className="flex items-center space-x-2 p-2 rounded-md  transition  hover:bg-gray-900 w-12 h-12"
        onClick={onClick}
      >
        {buttonTitle === "Profile" ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer text-white"
          />
        ) : (
          <i className={`${buttonIcon} text-2xl`}></i>
        )}

        <span className="px-2 py-2 mt-1  text-l  text-white ">
          {buttonTitle}
        </span>
      </button>
    </Link>
  );
};

export default NavButton;
