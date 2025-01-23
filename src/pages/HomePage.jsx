import Feed from "../components/Feed/Feed";
import Story from "../components/Story/Story.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-row justify-between ">
      <div className="flex-1 mr-[380px] ml-[250px]">
        <div className="flex flex-col items-center ">
          <Story />
          <div className="my-4" /> {/* Story ve Feed arasında boşluk */}
          <Feed />
        </div>
      </div>
      <div>
        {/* <ReduxExample />
        <ReduxApiExample /> */}
      </div>
      {/* <div className="flex flex-row justify-between">
        <Follow />
      </div> */}
    </div>
  );
};

export default HomePage;
