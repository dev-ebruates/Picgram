import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import Story from "../components/Story/Story";
import Follow from "../components/follow/Follow";

const HomePage = ({ setIsAuthenticated }) => {
  return (
    <div className="flex flex-row justify-between ">
      <Header setIsAuthenticated={setIsAuthenticated} />
      <div className="flex-1 mr-[380px] ml-[250px]">
        <Story />
        <Feed />
      </div>
      <div className="flex flex-row justify-between">
        <Follow />
      </div>
    </div>
  );
};

export default HomePage;
