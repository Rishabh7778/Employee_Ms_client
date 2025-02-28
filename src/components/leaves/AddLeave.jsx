import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    userId: user._id,
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchEmployee = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
          const response = await axios.post(
            `https://employee-mg-server.onrender.com/api/leave/add`,
            leave,
            {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          // console.log(response);
          if (response.data.success) {
            navigate(`/employee-dashboard/leaves/${user._id}`);
          }
        } catch (error) {
          console.error("Error fetching employee:", error);
          alert(error.response?.data?.error || "Server Error!");
        }
      };

      await fetchEmployee();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg border-t-4 border-blue-500">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Request Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Leave Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Leave Type</label>
            <select
              name="leaveType"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            >
              <option value="">-- Select Leave --</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">From Date</label>
              <input
                type="date"
                name="startDate"
                min={today}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">To Date</label>
              <input
                type="date"
                name="endDate"
                min={leave.startDate || today}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              rows="3"
              name="reason"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
