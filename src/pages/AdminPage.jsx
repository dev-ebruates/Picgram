import { Link } from "react-router-dom";
import {
  FaUsers,
  FaComments,
  FaChartLine,
  FaFileAlt,
  FaShieldAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const menuItems = {
    users: {
      icon: FaUsers,
      label: "Kullanıcı Yönetimi",
      subMenus: [
        { label: "Kullanıcı Listesi", content: <UserList /> },
        { label: "Yetki Yönetimi", content: <UserPermissions /> },
      ],
    },
    posts: {
      icon: FaComments,
      label: "Gönderi Denetimi",
      subMenus: [{ label: "Aktif Gönderiler", content: <ActivePosts /> }],
    },
    activities: {
      icon: FaChartLine,
      label: "Etkinlik İzleme",
      subMenus: [{ label: "Günlük Rapor", content: <DailyReport /> }],
    },
    policies: {
      icon: FaShieldAlt,
      label: "Platform Politikaları",
      subMenus: [
        { label: "Kullanım Koşulları", content: <TermsOfService /> },
        { label: "Gizlilik Politikası", content: <PrivacyPolicy /> },
        { label: "Topluluk Kuralları", content: <CommunityRules /> },
      ],
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6">
      <Link to="/">
          <h2 className=" italic font-serif text-4xl tracking-tight text-white ">
            Picgram
          </h2>
        </Link>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          {Object.entries(menuItems).map(([key, menu]) => (
            <div key={key}>
              <div
                onClick={() => {
                  setActiveMenu(activeMenu === key ? null : key);
                  setActiveSubMenu(null);
                }}
                className="flex items-center justify-between py-2 px-4 hover:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center">
                  <menu.icon className="inline mr-3" />
                  <span>{menu.label}</span>
                </div>
                <FaChevronDown
                  className={`transition-transform ${
                    activeMenu === key ? "rotate-180" : ""
                  }`}
                />
              </div>
              {activeMenu === key && (
                <div className="pl-6 mt-2 space-y-2 bg-gray-800 py-2">
                  {menu.subMenus.map((subMenu, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveSubMenu(index)}
                      className="block py-1 hover:text-blue-300 cursor-pointer"
                    >
                      {subMenu.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center bg-gray-900">
        {activeMenu && activeSubMenu !== null ? (
          <div className="w-2/3 bg-white p-12 rounded-xl shadow-2xl">
            {menuItems[activeMenu].subMenus[activeSubMenu].content}
          </div>
        ) : (
          <div className="w-2/3 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Yönetici Kontrol Paneli
            </h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <FaUsers className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-semibold">Toplam Kullanıcı</h3>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <FaComments className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-semibold">Aktif Gönderi</h3>
                <p className="text-3xl font-bold">456</p>
              </div>
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <FaFileAlt className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-semibold">Rapor Edilen İçerik</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Placeholder components for sub-menus
function UserList() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Ayşe Demir",
      email: "ayse@example.com",
      role: "Moderatör",
      status: "Aktif",
      joinDate: "2022-11-20",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet@example.com",
      role: "Kullanıcı",
      status: "Askıda",
      joinDate: "2024-01-10",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Kullanıcı",
      status: "Aktif",
      joinDate: "2023-05-15",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

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
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 font-medium text-black">{user.name}</td>
                <td className="p-3 text-black">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      user.role === "Moderatör"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  `}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-gray-600">{user.joinDate}</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteUser(user.id)}
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Kullanıcı bulunamadı.
        </div>
      )}
    </div>
  );
}

function UserPermissions() {
  return <div>Kullanıcı Yetkilendirme Sayfası</div>;
}

function ActivePosts() {
  return <div>Aktif Gönderiler Listesi</div>;
}

function DailyReport() {
  return <div>Günlük Rapor Detayları</div>;
}

function TermsOfService() {
  return <div>Kullanım Koşulları Metni</div>;
}

function PrivacyPolicy() {
  return <div>Gizlilik Politikası Metni</div>;
}

function CommunityRules() {
  return <div>Topluluk Kuralları Metni</div>;
}

export default AdminPage;
