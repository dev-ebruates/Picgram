import Feed from "../components/Feed/Feed"
import Header from "../components/Header/Header"
import Story from "../components/Story/Story"
import Follow from "../components/follow/Follow"
import "./HomePage.css"


const HomePage = ( {setIsAuthenticated}) => {
  return (
    <div className="home ">
    <Header setIsAuthenticated={setIsAuthenticated} />
    <div className="main-content">
      <Story />
      <Feed />
    </div>
    <div className="follow">
      <Follow />
    </div>
  </div>
  )
}

export default HomePage