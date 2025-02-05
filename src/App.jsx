import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MessagePage from "./pages/MessagePage";
import CommentsPage from "./pages/CommentsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SignalRService from "./components/signalR/SignalRService.js";

function App() {
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    const signalRService = SignalRService.getInstance();
    if (authToken) {
      signalRService.initialize();
    } else {
      signalRService.stopConnection();
    }
  }, [authToken]); // Token değiştiğinde SignalR başlasın
  return (
    <>
      <Link to="/messages" className="flex items-center gap-2">
        <ToastContainer position="top-center" autoClose={3000} />
      </Link>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comments"
          element={
            <ProtectedRoute>
              <CommentsPage />
            </ProtectedRoute>
          }
        />

        {/* Bilinmeyen URL'leri ana sayfaya yönlendir */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
