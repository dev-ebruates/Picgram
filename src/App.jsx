
import "./App.css"; // Tailwind CSS'i içeren CSS dosyanız

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-center mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          John Doe
        </h2>
        <p className="text-center text-gray-600 mb-4">Web Developer</p>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-semibold">New York, USA</p>
          </div>
          <div>
            <p className="text-gray-600">Followers</p>
            <p className="font-semibold">200</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
