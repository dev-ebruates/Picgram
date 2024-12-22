import  { useState } from "react";
import { motion } from "framer-motion";

const SearchSideBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const searchResults = [
    {
      id: 1,
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "john_doe",
      fullName: "John Doe",
    },
    {
      id: 2,
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "jane_smith",
      fullName: "Jane Smith",
    },
    {
      id: 3,
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "mike_harris",
      fullName: "Mike Harris",
    },
    {
      id: 4,
      profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
      username: "sarah_connor",
      fullName: "Sarah Connor",
    },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Burada arama mantığını ekleyeceksiniz
    // Örneğin, kullanıcıları filtrelemek için bir API çağrısı
  };

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "tween" }}
      className="fixed top-0 left-0 w-[250px] h-full bg-black shadow-lg z-50 overflow-y-auto search-sidebar"
    >
      <div className="p-4 search-sidebar-content">
        <div className="flex justify-between items-center mb-4 search-sidebar-header">
          <h2 className="text-xl font-bold mt-4 ml-2">Search</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-700 search-sidebar-close"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded-md mb-4 search-input bg-gray-800 text-white mt-6 border-gray-600"
        />

        <div className="search-results">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 hover:bg-gray-500 cursor-pointer search-result-item"
            >
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10 rounded-full mr-3 search-result-avatar"
              />
              <div>
                <p className="font-semibold search-result-username">
                  {user.username}
                </p>
          
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchSideBar;
