import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthenticatedProvider } from "./components/context/AuthenticatedContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthenticatedProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthenticatedProvider>
  
);
