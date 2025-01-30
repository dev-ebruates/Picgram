import { useState, useEffect } from "react";
import { useGetAllUserQuery } from "../../features/userFeatures/userApi.js";
import { useDeleteUserMutation } from "../../features/userFeatures/userApi.js";

const UserList = () => {
  const { data, isLoading } = useGetAllUserQuery();
  const [users, setUsers] = useState(data);
  const [deleteUserMutation] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (userId) => {
    if (window.confirm('Silmek istediğinize emin misiniz?')) {
      deleteUserMutation(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const toggleUserDetails = (user) => {
    setSelectedUser(selectedUser?.id === user.id ? null : user);
  };

  if (isLoading) return <div className="text-center py-8">Yükleniyor...</div>;

  return (
    <div className="p-4 md:p-6 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Users</h2>
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="User search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {filteredUsers?.map((user) => (
            <div 
              key={user.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div 
                className="flex items-center p-4 cursor-pointer"
                onClick={() => toggleUserDetails(user)}
              >
                <img
                  src={user.userProfilePicture}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-black">{user.username}</p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-semibold
                        ${user.role === 1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                      `}
                    >
                      {user.role === 1 ? "Admin" : "User"}
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedUser?.id === user.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-600">
                      Katılım Tarihi: {new Date(user.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Sil"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-900 text-white">
              <tr>
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name & Surname</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Join Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={user.userProfilePicture}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium text-black">{user.username}</td>
                  <td className="p-3 text-black">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${user.role === 1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                    `}
                    >
                      {user.role === 1 ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteClick(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Sil"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredUsers?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UserList;