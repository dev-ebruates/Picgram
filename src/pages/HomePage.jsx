import Feed from "../components/Feed/Feed";
import Story from "../components/Story/Story.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-row justify-between ">
        <div className="flex flex-col items-center ">
          <Story />
          <Feed />
        </div>
      </div>
  );
};

export default HomePage;
