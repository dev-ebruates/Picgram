import Feed from "../components/Feed/Feed";
import Story from "../components/Story/Story.jsx";

const HomePage = () => {
  return (
    <div className="flex justify-start w-full min-h-screen bg-black pt-[70px] pl-[10vw]">
      <div className="w-[600px] max-w-full flex flex-col items-center">
        <div className="-mt-10 p-4">
          <Story />
        </div>
        <Feed />
      </div>
    </div>
  );
};

export default HomePage;
