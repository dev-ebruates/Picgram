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
import UserList from "../components/admin/UserList";

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
          <div className="w-full bg-white p-12 rounded-xl shadow-2xl">
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
