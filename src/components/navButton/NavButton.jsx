const NavButton = ({ buttonIcon, buttonName }) => {
  
  return (
    <button className="flex items-center space-x-2 p-2 rounded-md  transition  hover:bg-gray-900 w-12 h-12">

 {buttonName === "Profile" ? (
      <img
        src="https://picsum.photos/210"
        alt="Profile"
        className="w-5 h-5 rounded-full border-2 border-gray-300 cursor-pointer"
      />
    ) : (
      <i className={`${buttonIcon} text-xl`}></i>
    )}
        

      <span className="px-2 py-2 mt-1 italic text-xl font-bold text-white ">
        {buttonName}
      </span>
    </button>
  );
};

export default NavButton;
