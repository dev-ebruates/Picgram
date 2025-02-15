import { Link } from "react-router-dom";
import {
  FaUsers,
  FaComments,
  FaChartLine,
  FaFileAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
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
  const { data, error, isLoading } = useGetAllReportsQuery();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // API'den gelen veriyi kullanarak grafik verilerini oluştur
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
        data: data?.data?.weeklyPostData || [],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

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
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-black z-50 p-4 flex justify-between items-center">
          <Link to="/">
            <h2 className="italic font-serif text-2xl tracking-tight text-white">Picgram</h2>
          </Link>
          <button 
            className="text-white text-2xl bg-transparent border-none cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      )}
       {/* Mobile Menu */}
       {isMobile && isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-black text-white z-40">
          {Object.entries(menuItems).map(([key, menu]) => (
            <div key={key} className="border-b border-gray-800">
              <div 
                onClick={() => {
                  setActiveMenu(activeMenu === key ? null : key);
                  setActiveSubMenu(null);
                }}
                className="flex items-center justify-between p-4 hover:bg-gray-800 cursor-pointer"
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
                <div className="pl-6 bg-gray-900 py-2">
                  {menu.subMenus.map((subMenu, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveSubMenu(index);
                        setIsMobileMenuOpen(false); // Menüyü kapat
                      }}
                      className="block py-2 hover:text-blue-300 cursor-pointer"
                    >
                      {subMenu.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Desktop Sidebar */}
      {!isMobile && (
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
      )}

      <main
        className={`flex-1 bg-gray-50 p-4 md:p-8 ${isMobile ? "mt-16" : ""}`}
      >
        {activeMenu && activeSubMenu !== null ? (
          <div className="w-full bg-white rounded-xl shadow-sm">
            {menuItems[activeMenu].subMenus[activeSubMenu].content}
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {data?.data?.totalUserCount || 0}
                    </p>
                  </div>
                  <div className="text-blue-500">
                    <FaUsers size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-500 text-sm mb-1">
                      Reported Content
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                  </div>
                  <div className="text-rose-500">
                    <FaFileAlt size={24} />
                  </div>
                </div>
              </div>
            </div>

            <DailyChart dailyData={dailyData} postsData={postsData} />
          </div>
        )}
      </main>
    </div>
  );
}

// Modern DailyChart component
function DailyChart({ dailyData, postsData }) {
  // Veriler yüklenmediyse veya undefined ise boş bir içerik döndür
  if (!dailyData || !postsData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Daily User Activity
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Loading data...</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Post Activity
          </h2>
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Varsayılan veri yapısı
  const defaultChartData = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          color: "#6B7280",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#111827",
        bodyColor: "#374151",
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 13,
          weight: "bold",
        },
        padding: 12,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return ` ${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          borderDash: [4, 4],
          color: "rgba(107, 114, 128, 0.1)",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
          callback: function (value) {
            return value;
          },
        },
      },
    },
  };

  const enhancedDailyData = {
    ...(dailyData || defaultChartData),
    datasets: [
      {
        ...(dailyData?.datasets?.[0] || defaultChartData.datasets[0]),
        label: "Users",
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgb(59, 130, 246)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgb(59, 130, 246)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        fill: {
          target: "origin",
          above: "rgba(59, 130, 246, 0.1)",
        },
      },
    ],
  };

  const enhancedPostsData = {
    ...(postsData || defaultChartData),
    datasets: [
      {
        ...(postsData?.datasets?.[0] || defaultChartData.datasets[0]),
        label: "Posts",
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgb(139, 92, 246)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "rgb(139, 92, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgb(139, 92, 246)",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        fill: {
          target: "origin",
          above: "rgba(139, 92, 246, 0.1)",
        },
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Daily User Activity
        </h2>
        <div className="h-[300px]">
          <Line data={enhancedDailyData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Daily Post Activity
        </h2>
        <div className="h-[300px]">
          <Line data={enhancedPostsData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
