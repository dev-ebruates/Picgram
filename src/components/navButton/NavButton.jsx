const NavButton = ({ buttonIcon, buttonTitle }) => {
  
  return (
    <button className="flex items-center space-x-2 p-2 rounded-md  transition  hover:bg-gray-900 w-12 h-12">

 {buttonTitle === "Profile" ? (
      <img
        src="https://picsum.photos/210"
        alt="Profile"
        className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer"
      />
    ) : (
      <i className={`${buttonIcon} text-2xl`}></i>
    )}
        

      <span className="px-2 py-2 mt-1  text-l  text-white ">
        {buttonTitle}
      </span>
    </button>
  );
};

export default NavButton;