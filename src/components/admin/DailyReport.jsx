import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const reportData = {
  date: "9 Ocak 2025",
  newUsers: 1230,
  activeUsers: 15678,
  posts: 5432,
  likes: 24780,
  topHashtag: "#YeniBaşlangıç",
  topPost: {
    user: "@lezzetustası",
    views: 10350,
  },
};

const dailyData = {
  labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
  datasets: [{
    label: 'Günlük Kayıtlar',
    data: [12, 19, 3, 5, 2, 3, 7],
    fill: false,
    backgroundColor: 'rgba(75,192,192,1)',
    borderColor: 'rgba(75,192,192,1)',
  }],
};

function DailyReport() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg w-11/12 max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {reportData.date} Günlük Raporu
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-700">Yeni Kullanıcılar</h2>
            <p className="text-3xl font-bold text-blue-900">{reportData.newUsers}</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-green-700">Aktif Kullanıcılar</h2>
            <p className="text-3xl font-bold text-green-900">{reportData.activeUsers}</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-yellow-700">Gönderiler</h2>
            <p className="text-3xl font-bold text-yellow-900">{reportData.posts}</p>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-pink-700">Beğeniler</h2>
            <p className="text-3xl font-bold text-pink-900">{reportData.likes}</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-purple-700">En Popüler Hashtag</h2>
          <p className="text-xl font-bold text-purple-900">{reportData.topHashtag}</p>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-indigo-700">En Çok Görüntülenen Gönderi</h2>
          <p className="text-md font-medium text-indigo-900">
            Kullanıcı: <span className="font-bold">{reportData.topPost.user}</span>
          </p>
          <p className="text-md font-medium text-indigo-900">
            Görüntülenme: <span className="font-bold">{reportData.topPost.views}</span>
          </p>
        </div>

        <div style={{ width: '300px', height: '200px' }}>
          <Line data={dailyData} options={{ responsive: true, maintainAspectRatio: false }} />
          <h2 style={{ fontSize: '20px' }}>Günlük Kayıt Grafiği</h2>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
