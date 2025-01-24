import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchQuery } from "../../features/searchFeatures/searchApi.js";
import { Link } from "react-router-dom";

const SearchSideBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
  };
  const { data } = useSearchQuery(searchQuery, {
    skip: !searchQuery || searchQuery.length === 0,
  });

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: isOpen ? 0 : "-100%", opacity: isOpen ? 1 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 left-0 w-[270px] h-full bg-gradient-to-br from-black via-black to-gray-900 shadow-2xl overflow-y-auto rounded-r-xl z-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-200">Search</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-300 transition-colors rounded-full p-2 hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search user..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 rounded-xl mb-4 bg-gray-900 text-gray-200 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
        />

        <div className="space-y-2">
          {data?.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center p-3 bg-gray-900 rounded-xl hover:bg-gray-800 cursor-pointer transition-colors group"
            >
              <Link to={`/${user.username}`} className="flex items-center w-full">
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="w-12 h-12 rounded-full mr-4 border border-gray-800 group-hover:scale-105 transition-transform"
                />
                <div>
                  <p className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {user.username}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchSideBar;
