import Feed from "../components/Feed/Feed";
import Story from "../components/Story/Story.jsx";

const HomePage = () => {
  return (
    <div className="flex flex-row justify-between ">
        <div className="flex flex-col items-center ">
          <Story />
          <div className="my-4" /> {/* Story ve Feed arasında boşluk */}
          <Feed />
        </div>
      </div>
  );
};

export default HomePage;
