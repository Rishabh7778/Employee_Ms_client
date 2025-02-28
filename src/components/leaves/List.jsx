import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const List = () => {
  const [leaves, setLeaves] = useState([]);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  // Use the id from URL if provided; otherwise, fallback to user._id
  const employeeId = id || user._id;

  const fetchLeaves = async () => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(
        `https://employee-mg-server.onrender.com/api/leave/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("Response data:", response.data);
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while fetching leaves.");
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [employeeId]);


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-center text-2xl font-bold mb-6 text-gray-800">Manage Leaves</h3>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search by department name"
          className="border p-2 rounded-lg w-2/3 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 border">SNO</th>
              <th className="py-3 px-4 border">Leave Type</th>
              <th className="py-3 px-4 border">From</th>
              <th className="py-3 px-4 border">To</th>
              <th className="py-3 px-4 border">Description</th>
              <th className="py-3 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4 border text-center">{sno++}</td>
                  <td className="py-3 px-4 border text-center">{leave.leaveType}</td>
                  <td className="py-3 px-4 border text-center">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border text-center">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border text-center">{leave.reason}</td>
                  <td className={`py-3 px-4 border text-center font-semibold ${leave.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                    {leave.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No leave records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
