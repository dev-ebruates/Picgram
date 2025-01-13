import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage.jsx";
import MessagePage from "./pages/MessagePage";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useGetMyProfileQuery } from "./features/userFeatures/userApi.js";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5148/notificationHub")
  .build();
connection.start().catch((error) => console.error(error));
connection.on("ReceiveNotification", () => {
  // Update your component state or perform any other action
});

function App() {
 

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
  );
}

export default App;
