import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../features/userFeatures/userApi.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [createUserMutation] = useCreateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkbox = document.querySelector('input[type="checkbox"]');
    if (!checkbox.checked) {
      toast.error(
        "You must accept the terms of use, privacy policy and community guidelines."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      var response = await createUserMutation(formData);
      if (response.data.success === true) {
        toast.success("Registration Successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      if (response.data.success === false) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
    // Burada API isteği gönderebilirsiniz
  };

  return (
    <div className="flex items-center  flex-col justify-center min-h-screen bg-gray-100 text-black">
      <ToastContainer position="top-center" />
      <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 mb-10 italic font-script text-center text-6xl font-bold tracking-tight text-gray-800 ">
            picgram
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Sign Up
          </h2>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <label>
              <input type="checkbox" required />I have read and accept the usage
              data and community.
              <Link
                to="/terms"
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use | Community Rules
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>

      <Link to="/login">
        <div className="flex p-8 w-96 justify-center   ">
          <div className="flex flex-col justify-center">
            <h2 className="text-l  mb-4 text-center text-gray-500">
              If you're not redirected, click
            </h2>

            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
              LOGIN
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RegisterPage;
