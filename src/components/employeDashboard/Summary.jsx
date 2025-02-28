import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto p-4 sm:p-6 border border-gray-200">
      {/* Icon Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 sm:p-6 flex items-center justify-center rounded-full w-16 h-16 sm:w-20 sm:h-20">
        <FaUser className="text-3xl sm:text-5xl" />
      </div>

      {/* Welcome Text Section */}
      <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
        <p className="text-xl sm:text-2xl font-semibold text-gray-700">Welcome,</p>
        <p className="text-2xl sm:text-3xl font-bold text-blue-600">
          {user?.name || "Guest"}
        </p>
      </div>
    </div>
  );
};

export default Summary;
