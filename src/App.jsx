import  { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";






function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  useEffect(() => {
    console.log(isAuthenticated);
    const auth = localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    console.log(isAuthenticated);
  }, [setIsAuthenticated]);


  return (
    <Routes>
    <Route
      path="/login"
      element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
    />
    {/* Ana Sayfa - Yalnızca Giriş Yapıldıysa */}
    <Route
      path="/register"
      element={<RegisterPage/>}
    />
    <Route
          path="/"
          element={
            isAuthenticated ? <HomePage setIsAuthenticated={setIsAuthenticated}  /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />
          }
        />
  </Routes>
  );
   

}

export default App;
