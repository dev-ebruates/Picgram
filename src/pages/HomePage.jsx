import Feed from "../components/Feed/Feed";
import Story from "../components/Story/Story.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  return (
    <div className="flex justify-start w-full min-h-screen bg-black pt-[70px] lg:pt-0 pl-0 lg:pl-[250px]">
      {/* Content container */}
      <div className="w-full sm:w-[600px] max-w-full flex flex-col items-center px-4 sm:px-0">
        {/* Story component centered */}
        <div className="flex justify-center w-full max-w-full p-4">
          <Story />
        </div>
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;