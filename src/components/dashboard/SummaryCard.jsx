import React from "react";

const SummaryCard = ({ icon, text, number, bgColor }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full p-4">
      <div className={`${bgColor} text-white p-4 sm:p-6 flex items-center justify-center rounded-lg`}>
        <div className="text-3xl sm:text-4xl">{icon}</div>
      </div>
      <div className="text-center sm:text-left sm:pl-4 mt-2 sm:mt-0">
        <p className="text-lg sm:text-xl font-semibold text-gray-700">{text}</p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
