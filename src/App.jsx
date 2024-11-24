import "./App.css";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Story from "./components/Story/Story";
import Follow from "./components/follow/Follow";



function App() {
  return (
    <div className="app ">
      <Header />
      <div className="main-content">
        <Story />
        <Feed />
      </div>
      <div className="follow">
        <Follow />
      </div>
    </div>
  );
}

export default App;
