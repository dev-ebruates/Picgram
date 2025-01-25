import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MessagePage from "./pages/MessagePage";
import CommentsPage from "./pages/CommentsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />
        <Route path="/:username" element={<ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>} />
        
        <Route path="/messages" element={<ProtectedRoute>
                <MessagePage />
              </ProtectedRoute>} />
        <Route path="/comments" element={<ProtectedRoute>
                <CommentsPage />
              </ProtectedRoute>} />

        {/* Bilinmeyen URL'leri ana sayfaya yönlendir */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
