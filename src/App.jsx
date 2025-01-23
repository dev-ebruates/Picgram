import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage.jsx";
import MessagePage from "./pages/MessagePage";
import TermsAndCommunityPage from "./pages/TermsAndCommunityPage.jsx";
import CommentsPage from "./pages/CommentsPage.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
  const location = useLocation();
  const isProtectedRoute = location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/terms" && location.pathname !== "/admin";

  return (
    <>
      {isProtectedRoute && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms" element={<TermsAndCommunityPage />} />

        {/* Protected Routes */}
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
          path="/story"
          element={
            <ProtectedRoute>
              <StoryPage />
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
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={1}>
              <AdminPage />
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
