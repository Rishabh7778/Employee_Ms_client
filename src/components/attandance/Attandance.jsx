import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Attandance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const statusChange = () => {
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    let sno = 1;
    try {
      const response = await axios.get(`https://employee-mg-server.onrender.com/api/attendance`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        const data = response.data.attendance
          .filter(att => att.employeeId) // Remove records with no employee data
          .map((att, index) => {
            return {
              employeeId: att.employeeId.employeeId,
              sno: index + 1,
              department: att.employeeId.department?.dep_name,
              name: att.employeeId.userId?.name,
              action: (
                <AttendanceHelper
                  status={att.status}
                  employeeId={att.employeeId.employeeId}
                  statusChange={statusChange}
                />
              )
            };
          });
        setAttendance(data);
        setFilteredAttendance(data);
        setFilteredAttendance(data);
      } else {
        console.warn("Data not received:", response.data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      console.error("Error fetching attendance:", error);
      alert(error.response?.data?.error || "Server Error!");
    } finally {
      setLoading(false);
    }
  };


  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue); // Update search term state
    const records = attendance.filter((emp) =>
      emp.department.toLowerCase().includes(searchValue)
    );
    setFilteredAttendance(records);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-center text-xl font-semibold mb-4">Attendance Mark</h3>
      <div className="flex justify-between items-center border p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by department or employee name"
          className="border p-2 rounded-lg w-1/3"
          value={searchTerm}
          onChange={handleFilter}
        />
        <p className='text-2xl'>
          Mark Employee for{" "}
          <span className='font-bold underline'>
            {new Date().toISOString().split("T")[0]}
          </span>
        </p>
        <Link
          to="/admin-dashboard/attandanceReport"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Attendance Reports
        </Link>
      </div>
      <div>
        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : (
          <DataTable columns={columns} data={filteredAttendance} pagination />
        )}
      </div>
    </div>
  );
};

export default Attandance;
