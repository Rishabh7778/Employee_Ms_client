import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/employeDashboard/SIdebar";
import { FaBars, FaTimes } from "react-icons/fa";

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed lg:relative z-50 h-full bg-gray-900 text-white ${isSidebarOpen ? "translate-x-0" : "-translate-x-72"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        {/* Cross Button for Closing Sidebar */}
        <button 
          className="absolute top-4 right-4 text-white lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* Navbar with Toggle Button */}
        <Navbar />
        <div className="p-4 flex items-center sm:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-800 text-2xl">
            <FaBars />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
