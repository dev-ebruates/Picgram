import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";
import MessagePage from "./pages/MessagePage";
import CommentsPage from "./pages/CommentsPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/comments" element={<CommentsPage />} />

        {/* Bilinmeyen URL'leri ana sayfaya yönlendir */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
