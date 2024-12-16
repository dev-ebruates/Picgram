import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/story" element={<StoryPage />} />
    </Routes>
  );
}

export default App;
