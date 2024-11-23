import "./Header.css";

function Header() {
  return (
    <header className="header border-r border-gray-900 h-10 ">
      <div className="logo">
        <h2 className="italic font-script text-4xl font-bold tracking-tight text-white">
          picgram
        </h2>
      </div>

      <nav className="menu">
        <ul>
          <li className="flex items-center -space-x-5 hover:text-gray-500">
            <i className="fas fa-home text-xl"></i>
            <button className=" px-2 py-2 mt-1 italic text-xl font-bold text-white bg-gradient-to-r focus:ring-offset-2  hover:text-gray-500">
              Home
            </button>
          </li>
          <li className="flex items-center -space-x-1 hover:text-gray-500">
            <i className="fas fa-home text-xl"></i>
            <button className=" px-2 py-2 mt-1 italic text-xl font-bold text-white bg-gradient-to-r focus:ring-offset-2  hover:text-gray-500">
              Message
            </button>
          </li>
          <li className="flex items-center -space-x-5 hover:text-gray-500">
            <i className="fas fa-home text-xl"></i>
            <button className=" px-2 py-2 mt-1 italic text-xl font-bold text-white bg-gradient-to-r focus:ring-offset-2  hover:text-gray-500">
              Search
            </button>
          </li>
          <li className="flex items-center -space-x-6 hover:text-gray-500">
            {/* Profil Resmi */}
            <img
              src="https://picsum.photos/210"
              alt="Profile"
              className="w-7 h-7 rounded-full border-2 border-gray-300 hover:border-gray-500 cursor-pointer"
            />

            {/* Profil Butonu */}
            <button className="px-2 py-2 italic text-xl font-bold text-white bg-gradient-to-r focus:ring-offset-2 hover:text-gray-500">
              Profile
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
