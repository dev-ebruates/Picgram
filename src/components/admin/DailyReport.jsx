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
import { FaUsers, FaImage, FaUserPlus, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
  const today = new Date();
  const formattedDate = today.toLocaleDateString("tr-TR");

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className=" bg-white py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Daily Report
          </h1>
          <p className="text-gray-600 text-lg">{formattedDate}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 text-sm font-medium">New Users</p>
                <h2 className="text-4xl font-bold text-blue-900 mt-2">
                  {data?.data?.dailyUserCount || 0}
                </h2>
              </div>
              <FaUserPlus className="text-4xl text-blue-600 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-800 text-sm font-medium">Active Users</p>
                <h2 className="text-4xl font-bold text-emerald-900 mt-2">
                  {data?.data?.totalUserCount || 0}
                </h2>
              </div>
              <FaUsers className="text-4xl text-emerald-600 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-violet-100 to-violet-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-800 text-sm font-medium">Today's Posts</p>
                <h2 className="text-4xl font-bold text-violet-900 mt-2">
                  {data?.data?.dailyPostCount || 0}
                </h2>
              </div>
              <FaImage className="text-4xl text-violet-600 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-800 text-sm font-medium">Total Posts</p>
                <h2 className="text-4xl font-bold text-amber-900 mt-2">
                  {data?.data?.totalPostCount || 0}
                </h2>
              </div>
              <FaChartLine className="text-4xl text-amber-600 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-rose-800 text-sm font-medium">Monthly Users</p>
                <h2 className="text-4xl font-bold text-rose-900 mt-2">
                  {data?.data?.monthlyUserCount || 0}
                </h2>
              </div>
              <FaUsers className="text-4xl text-rose-600 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl p-6 shadow-md transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-800 text-sm font-medium">Monthly Posts</p>
                <h2 className="text-4xl font-bold text-cyan-900 mt-2">
                  {data?.data?.monthlyPostCount || 0}
                </h2>
              </div>
              <FaImage className="text-4xl text-cyan-600 opacity-80" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default DailyReport;
