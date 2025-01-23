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

const clientId =
  "1050319585875-1ujql7a4palt2csnbm2ohf1ufbcr1mio.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
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
              <>
                <Header /> <App />
              </>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
