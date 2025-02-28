import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth() 

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`https://employee-mg-server.onrender.com/api/auth/login`, { email, password })

      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if(response.data.user.role == "admin"){
          navigate('/admin-dashboard')
        }else{
          navigate('/employee-dashboard')
        }
      }
    }
    catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div className="h-screen relative">
      <div className="bg-black h-1/2 w-full absolute top-0"></div>

      <div className="bg-gray-300 h-1/2 w-full absolute bottom-0"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-center text-2xl font-semibold mb-4">Login Page</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
