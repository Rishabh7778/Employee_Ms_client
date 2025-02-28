import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import axios from "axios";
import {
  FaBuilding,
  FaCalendar,
  FaCheck,
  FaHourglassEnd,
  FaMoneyBill,
  FaTimes,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(`https://employee-mg-server.onrender.com/api/dashboard/summary`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSummary(summary.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          bgColor="bg-teal-500"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Department"
          number={summary.totalDepartments}
          bgColor="bg-indigo-500"
        />
        <SummaryCard
          icon={<FaMoneyBill />}
          text="Monthly Pay"
          number={summary.totalSalaries}
          bgColor="bg-green-500"
        />
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 mt-12 text-center">
        Leave Details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SummaryCard
          icon={<FaCalendar />}
          text="Leave Applied"
          number={summary.leaveSummary.appliedFor}
          bgColor="bg-purple-500"
        />
        <SummaryCard
          icon={<FaCheck />}
          text="Leave Approved"
          number={summary.leaveSummary.approved}
          bgColor="bg-blue-500"
        />
        <SummaryCard
          icon={<FaTimes />}
          text="Leave Pending"
          number={summary.leaveSummary.pending}
          bgColor="bg-red-500"
        />
        <SummaryCard
          icon={<FaHourglassEnd />}
          text="Leave Rejected"
          number={summary.leaveSummary.rejected}
          bgColor="bg-yellow-500"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
