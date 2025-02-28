import React from 'react';
import axios from 'axios';

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "90px",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center"
    }
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "160px",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center"
    }
  },
  {
    name: "EmpId",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "160px",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center"
    }
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    width: "350px",
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center"
    }
  },
  {
    name: "Action",
    selector: (row) => row.action,
    $center: true,
    style: {
      fontSize: "16px",
      fontWeight: "bold",
    }
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {

  const markEmployee = async (status, employeeId) => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
    try {
      const response = await axios.put(
        `https://employee-mg-server.onrender.com/api/attendance/update/${employeeId}`,
        { status },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      if (response.data.success) {
        statusChange();
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert(error.response?.data?.error || "Error updating attendance");
    }
  };

  return (
    <div className="text-center">
      {status == null ? (
        <div className="flex gap-3 justify-center mt-2">
          <button
            onClick={() => markEmployee("present", employeeId)}
            className="px-5 py-2 bg-green-500 cursor-pointer text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition"
          >
            Present
          </button>
          <button
            onClick={() => markEmployee("absent", employeeId)}
            className="px-5 py-2 bg-red-500 cursor-pointer text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition"
          >
            Absent
          </button>
          <button
            onClick={() => markEmployee("sick", employeeId)}
            className="px-5 py-2 bg-yellow-500 cursor-pointer text-white rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
          >
            Sick
          </button>
          <button
            onClick={() => markEmployee("leave", employeeId)}
            className="px-5 py-2 bg-blue-500 cursor-pointer text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="text-xl font-bold text-gray-700 mt-2">{status}</p>
      )}
    </div>
  );
};
