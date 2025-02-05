import picgramLogin from "../images/picgram-login-left.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthMutation,
  useGoogleAuthMutation,
} from "../features/authFeatures/authApi.js";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authFeatures/authSlice.js";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import SignalRService from "../components/signalR/SignalRService.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  console.log("flkasdglkasjgskd");

  const dispatch = useDispatch();
  const [authMutation] = useAuthMutation();
  const [googleAuthMutation] = useGoogleAuthMutation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authMutation(formData);
      if (result.data.success === true) {
        const userData = {
          username: result.data.data.username,
          token: result.data.data.token,
          role: result.data.data.role,
        };
        dispatch(setCredentials(userData));
        const signalRService = SignalRService.getInstance();
        signalRService.initialize();
        toast.success("Welcome back " + " " + result.data.data.username);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      if (result.data.success === false) {
        toast.error(result.data.message);
      }
    } catch (err) {
      toast.error("Login failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-center" />

      {/* Sol Taraf - Arka Plan Resmi */}
      <div
        className="hidden md:block w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${picgramLogin})`,
        }}
      ></div>

      {/* Sağ Taraf - Login Formu */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 py-12 bg-gradient-to-r from-gray-200 via-gray-500 to-gray-800 text-black">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 mb-10 italic font-script text-center text-4xl md:text-6xl font-bold tracking-tight text-gray-800">
              picgram
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              placeholder="Username or Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-100"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-100"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-400 text-black py-2 rounded-md hover:bg-gray-500 transition"
            >
              Sign in
            </button>
          </form>
          <div className="flex items-center justify-between my-4">
            <hr className="w-1/4 border-gray-300" />
            <span className="text-gray-500 text-sm">Or</span>
            <hr className="w-1/4 border-gray-300" />
          </div>
          <div className="flex justify-center space-x-4">
            <span>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const result = await googleAuthMutation(credentialResponse);
                    if (result.data.success === true) {
                      const userData = {
                        username: result.data.data.username,
                        token: result.data.data.token,
                        role: result.data.data.role,
                      };
                      dispatch(setCredentials(userData));
                      toast.success(
                        "Welcome back " + " " + result.data.data.username
                      );
                      setTimeout(() => {
                        navigate("/");
                      }, 1000);
                    }
                  } catch (err) {
                    console.error("Login failed:", err);
                  }
                }}
                onError={() => {}}
              />
            </span>
          </div>

          <div className="flex items-center justify-between my-4">
            <hr className="w-full border-gray-300" />
          </div>

          <div className="flex items-center justify-between">
            <Link to="/register" className="w-full">
              <div className="text-center text-sm text-gray-500 mb-4">
                Don&apos; t have an account?
              </div>
              <button className="text-center text-sm bg-gray-400 border border-gray-400 rounded-md p-2 hover:bg-gray-600 w-full">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
