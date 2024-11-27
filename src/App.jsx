import { useContext, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

import AuthenticatedContext from "./components/context/AuthenticatedContext";

function App() {
  const { isAuthenticated, setIsAuthenticated } =
    useContext(AuthenticatedContext);

    

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/"
        element={isAuthenticated ? <HomePage /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
