import React, { useState } from "react";
import AdminSideBar from "../components/dashboard/AdminSideBar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar for large screens */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 sm:relative sm:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:block`}>
        <AdminSideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* Navbar with Toggle Button */}
        <Navbar />
        <div className="p-4 flex items-center sm:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-800 text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
