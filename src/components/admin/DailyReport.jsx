import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAllReportsQuery } from "../../features/reportsFeatures/reportsApi.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function DailyReport() {
  const { data } = useGetAllReportsQuery();

  const today = new Date(); // Bugünün tarihini alır
  const formattedDate = today.toLocaleDateString("tr-TR"); // Tarihi Türkçe formatında gösterir (GG.AA.YYYY)
  console.log(formattedDate); // Örnek: 22.01.2025

  return (
    <div className="bg-gray-800 h-auto flex flex-col items-center py-10">
      <div className="bg-gray-800 shadow-md rounded-lg w-11/12 max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-white bold mb-4">
          {formattedDate} - Daily Report
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-700">New Users</h2>
            <p className="text-3xl font-bold text-blue-900">
              {data?.data?.dailyUserCount}
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-700">
              Active Users
            </h2>
            <p className="text-3xl font-bold text-green-900">
              {data?.data?.totalUserCount}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-700">
              Today's Posts
            </h2>
            <p className="text-3xl font-bold text-blue-900">
              {data?.data?.dailyPostCount}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-700">
              Active Posts
            </h2>
            <p className="text-3xl font-bold text-green-900">
              {data?.data?.totalPostCount}
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-yellow-700">
              Month's Users
            </h2>
            <p className="text-3xl font-bold text-yellow-900">
              {data?.data?.monthlyUserCount}
            </p>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-pink-700">
              Mounth's Posts
            </h2>
            <p className="text-3xl font-bold text-pink-900">
              {data?.data?.monthlyPostCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
