import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header/Header.jsx";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TermsAndCommunityPage from "./pages/TermsAndCommunityPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import ToogleHeader from "./components/Header/ToogleHeader.jsx";



createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/story" element={<StoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/terms" element={<TermsAndCommunityPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={1}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] min-h-screen">
                <div className="hidden lg:block border-r border-gray-200">
                  <Header />
                </div>
                <div className="grid grid-cols-1 ">
                  <div className="lg:hidden">
                    <ToogleHeader />
                  </div>
                  <div>
                    <App />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
