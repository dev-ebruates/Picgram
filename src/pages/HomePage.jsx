import { useEffect, useState } from "react";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import Story from "../components/Story/Story";
import { getAllStories } from "../services/storyServices";
import ReduxExample from "../components/reduxExample/ReduxExample.jsx";
import ReduxApiExample from "../components/reduxApiExample/ReduxApiExample.jsx";

const HomePage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getAllStories().then((response) => {
      setStories(response.data);
    });
  }, []);

  return (
    <div className="flex flex-row justify-between ">
      <Header />
      <div className="flex-1 mr-[380px] ml-[250px]">
        <Story stories={stories} />
        <Feed />
      </div>
     <div>
      <ReduxExample/>
      <ReduxApiExample/>
     </div>
      {/* <div className="flex flex-row justify-between">
        <Follow />
      </div> */}
    </div>
  );
};

export default HomePage;
