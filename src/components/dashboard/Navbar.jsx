import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
      {/* Left: Brand / Welcome Text */}
      <div className="text-white text-lg font-semibold">
        {loading ? <p>Loading...</p> : <p>Welcome {user?.name || "User"}</p>}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="text-white text-2xl sm:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`absolute sm:static top-16 right-0 bg-gray-800 sm:bg-transparent w-full sm:w-auto p-4 sm:p-0 transition-all duration-300 ${
          menuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 w-full sm:w-auto"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
