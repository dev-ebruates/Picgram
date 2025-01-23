import { Link } from "react-router-dom";
import {
  FaUsers,
  FaComments,
  FaChartLine,
  FaFileAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";
import UserList from "../components/admin/UserList";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import DailyReport from "../components/admin/DailyReport";
import CommentModeration from "../components/admin/CommentModeration";
import { useGetAllReportsQuery } from "../features/reportsFeatures/reportsApi.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const { data, isLoading, error } = useGetAllReportsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

  const dailyData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Daily User Count",
        data: data?.data?.weeklyUserData || [],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const postsData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Daily Post Count",
        data: data?.data?.weeklyPostData || [], // API'den gelen veriyi bağladık
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const menuItems = {
    users: {
      icon: FaUsers,
      label: "User Management",
      subMenus: [{ label: "User List", content: <UserList /> }],
    },
    posts: {
      icon: FaComments,
      label: "Shipment Inspection",
      subMenus: [{ label: "Active Comments", content: <CommentModeration /> }],
    },
    activities: {
      icon: FaChartLine,
      label: "Activity Tracking",
      subMenus: [
        { label: "Daily Report", content: <DailyReport /> },
        {
          label: "Daily User-Post Chart",
          content: <DailyChart dailyData={dailyData} postsData={postsData} />,
        },
      ],
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black border border-gray-800 text-white p-6">
        <Link to="/">
          <h2 className="italic font-serif text-4xl tracking-tight text-white">
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
      <main className="flex-1 flex items-center justify-center bg-black">
        {activeMenu && activeSubMenu !== null ? (
          <div className="w-full h-screen bg-white p-12 rounded-xl shadow-2xl">
            {menuItems[activeMenu].subMenus[activeSubMenu].content}
          </div>
        ) : (
          <div className="w-2/3 bg-gradient-to-r from-gray-500 to-gray-600 text-white p-12 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Admin Control Panel
            </h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <FaUsers className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-semibold">Total Users</h3>
                <p className="text-3xl font-bold">
                  {data?.data?.totalUserCount}
                </p>
              </div>
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <FaComments className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-semibold">Active Post</h3>
                <p className="text-3xl font-bold">
                  {data?.data?.totalPostCount}
                </p>
              </div>
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <FaFileAlt className="mx-auto text-4xl mb-4" />
                <h3 className="text-xl font-semibold">Reported</h3>
                <p className="text-3xl font-bold">1</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Placeholder components for sub-menus
function DailyChart({ dailyData, postsData }) {
  return (
    <div>
      <div style={{ width: "400px", height: "300px" , backgroundColor: "white"}}>
        <Line
          data={dailyData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true, // Y ekseni sıfırdan başlar
                ticks: {
                  stepSize: 1, // Her adım 1 artar
                  callback: function (value) {
                    return value; // 0, 1, 2, 3... şeklinde yazdırır
                  },
                },
              },
            },
          }}
        />
      </div>{" "}
      <div style={{ width: "400px", height: "300px",  backgroundColor: "white"}}>
        <Line
          data={postsData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true, // Y ekseni sıfırdan başlar
                ticks: {
                  stepSize: 1, // Her adım 1 artar
                  callback: function (value) {
                    return value; // 0, 1, 2, 3... şeklinde yazdırır
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default AdminPage;
