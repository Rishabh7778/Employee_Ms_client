import React, { useEffect, useState } from "react";
import { columns, LeaveButton } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterLeave, setFilterLeave] = useState([]);

  const fetchLeaves = async () => {
    try {
      let sno = 1;
      // const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.get(`https://employee-mg-server.onrender.com/api/leave`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave?.employeeId?.employeeId || "N/A",
          name: leave?.employeeId?.userId?.name || "Unknown",
          leaveType: leave?.leaveType || "N/A",
          department: leave?.employeeId?.department?.dep_name || "N/A",
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status || "Unknown",
          action: <LeaveButton Id={leave._id} />
        }));

        setLeaves(data);
        setFilterLeave(data);
      } else {
        console.warn("Invalid data structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Server Error!");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterLeave(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilterLeave(data);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h3 className="text-center text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Leave Management
      </h3>

      {/* Search & Filter Controls - Hamesha dikhne chahiye */}
      <div className="flex flex-col md:flex-row md:justify-between items-center bg-gray-100 p-4 rounded-lg shadow space-y-4 md:space-y-0">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            onChange={filterByInput}
            placeholder="Search by Employee ID"
            className="border p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => filterByButton("Pending")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Pending
          </button>
          <button
            onClick={() => filterByButton("Approved")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Approved
          </button>
          <button
            onClick={() => filterByButton("Rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto mt-6 shadow-md rounded-lg">
        <DataTable
          columns={columns}
          data={filterLeave}
          pagination
          responsive
          // Agar koi data nahi hai toh yeh custom message dikhayega
          noDataComponent={
            <div className="py-4 text-center text-gray-500">No leave records found</div>
          }
          customStyles={{
            table: {
              style: {
                minWidth: "100%",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Table;
