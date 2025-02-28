import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaTachometerAlt, FaUsers, FaCogs, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  // Function to return active link class
  const navItemClass = ({ isActive }) =>
    `${isActive ? "bg-teal-500" : ""} flex items-center gap-4 px-5 py-4 rounded-lg text-lg hover:bg-gray-800 transition`;

  return (
    <div className="w-72 h-screen bg-gray-900 text-white flex flex-col p-5">
      {/* Sidebar Header */}
      <div className="text-2xl font-bold text-center pb-6 border-b border-gray-700">
        Employee MS
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col gap-5 mt-6">
        <NavLink to="/employee-dashboard" end className={navItemClass}>
          <FaBuilding className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={navItemClass}>
          <FaTachometerAlt className="text-xl" />
          <span>My Profile</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={navItemClass}>
          <FaUsers className="text-xl" />
          <span>Leaves</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={navItemClass}>
          <FaMoneyBillWave className="text-xl" />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/employee-dashboard/setting" className={navItemClass}>
          <FaCogs className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
