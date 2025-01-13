import { useState } from "react";
import { useGetAllUserQuery } from "../../features/userFeatures/userApi.js";
import { useEffect } from "react";
import { useDeleteUserMutation } from "../../features/userFeatures/userApi.js";


const UserList = () => {
  const  { data, isLoading } = useGetAllUserQuery();
  const [users, setUsers] = useState(data);

  const[deleteUserMutation]= useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
    // data değiştiğinde users state'ini güncelle
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

  if(isLoading) return <div>Yukleniyor...</div>
  return (
    <div className="p-6 bg-white h-screen w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Kullanıcı Listesi</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-64"
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

      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr className="text-gray-600">
              <th className="p-3 text-left">Profil</th>
              <th className="p-3 text-left">Ad Soyad</th>
              <th className="p-3 text-left">E-posta</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">Katılım Tarihi</th>
              <th className="p-3 text-left">İşlem</th>
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
                    ${user.role ===1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                  `}
                  >
                    {user.role === 1 ? "Admin" : "User"}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{new Date(user.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
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

      {filteredUsers?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Kullanıcı bulunamadı.
        </div>
      )}
    </div>
  );
}

export default UserList
