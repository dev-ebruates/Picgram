import Feed from "../components/feed/Feed";
import Header from "../components/Header/Header";
import Story from "../components/Story/Story";
import ReduxExample from "../components/reduxExample/ReduxExample.jsx";
import ReduxApiExample from "../components/reduxApiExample/ReduxApiExample.jsx";


const HomePage = () => {



  return (
    <div className="flex flex-row justify-between ">
      <Header />
      <div className="flex-1 mr-[380px] ml-[250px]">
        <div className="flex flex-col items-center">
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
