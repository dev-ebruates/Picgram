


import "./App.css";
import  Feed  from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Story from "./components/Story/Story";


function App() {
  return (
    <div className="app ">
      <Header />
      <div className="main-content">
        <Story/>
        <Feed />
      </div>
    </div>
  );
}

export default App;
