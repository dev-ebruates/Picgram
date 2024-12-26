import picgramLogin from "../images/picgram-login-left.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthMutation } from "../features/authFeatures/authApi.js";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [authMutation, {
    error: authError,
    isLoading: authLoading,
  }] = useAuthMutation();

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
          user: result.data.data.user,
          token: result.data.data.token
        };
        dispatch({ type: 'setCredentials', payload: userData });
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="h-screen flex">
      {/* Sol Taraf - Arka Plan Resmi */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${picgramLogin})`,
        }}
      ></div>

      {/* Sağ Taraf - Login Formu */}
      <div className="w-1/2 flex items-center justify-center px-6 py-12 bg-gradient-to-r from-gray-200 via-gray-500 to-gray-800 text-black">
        <div className=" bg-gray-50  p-6 rounded-lg shadow-md w-full max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 mb-10 italic font-script text-center text-6xl font-bold tracking-tight text-gray-800 ">
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
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-100"
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
            <span className="text-gray-500 text-sm">YA DA</span>
            <hr className="w-1/4 border-gray-300" />
          </div>
          <div className="flex justify-center space-x-4">
            {/* Facebook İkonu */}
            <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M22.675 0H1.325C.594 0 0 .594 0 1.326v21.348C0 23.406.594 24 1.325 24h11.495v-9.294H9.69V11.41h3.13V8.822c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.506 0-1.798.716-1.798 1.765v2.314h3.595l-.468 3.297h-3.127V24h6.127c.73 0 1.324-.594 1.324-1.326V1.326C24 .594 23.406 0 22.675 0z" />
              </svg>
            </button>

            {/* Google İkonu */}
            <button className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-6 w-6"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.36 1.44 8.31 3.69l6.19-6.19C34.18 3.56 29.54 1.5 24 1.5 14.86 1.5 7.16 7.16 4.23 15.04l7.89 6.15C13.65 14.53 18.48 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24c0-1.74-.2-3.43-.57-5.05H24v9.57h12.59c-.54 2.86-2.15 5.28-4.56 6.91l7.29 5.68c4.25-3.92 6.68-9.7 6.68-16.11z"
                />
                <path
                  fill="#FBBC05"
                  d="M4.23 32.96c-1.22-2.46-1.93-5.2-1.93-8.03s.71-5.57 1.93-8.03L-3.66 10.23C-5.52 14.14-6.5 18.93-6.5 24s.98 9.86 2.84 13.77l7.89-6.15z"
                />
                <path
                  fill="#34A853"
                  d="M24 46.5c5.87 0 10.79-1.96 14.37-5.3l-7.29-5.68c-2.01 1.33-4.6 2.12-7.08 2.12-5.52 0-10.35-5.03-12.08-11.69l-7.89 6.15C7.16 40.84 14.86 46.5 24 46.5z"
                />
              </svg>
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <a href="#" className="text-gray-600 hover:underline">
              you forgot your password?
            </a>
          </div>
          <div className="flex items-center justify-between my-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-500 text-sm"></span>
          </div>

          <Link to="/register">
            <div className="flex items-center justify-between">
              <a className=" text-center text-sm text-gray-500 mt-4">
                Don't have an account?
              </a>

              <button className="text-center text-sm bg-gray-400 mt-4 border border-gray-400 rounded-md p-2 hover:bg-gray-600 w-full  ">
                Sign up
              </button>
            </div>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
