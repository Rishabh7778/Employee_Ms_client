import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  // const STATIC_URL = "https://employee-mg-server.onrender.com/"


  useEffect(() => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/leave/detail/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.error("Error fetching leave details:", error);
        alert(error.response?.data?.error || "Server Error!");
      }
    };


    fetchLeave();
  }, [id]);


  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://employee-mg-server.onrender.com/api/leave/${id}`, { status }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      // console.log(response); // Check API response
      if (response.data.success) {
        navigate('/admin-dashboard/leaves');
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      alert(error.response?.data?.error || "Server Error!");
    }
  }
  // https://employee-mg-server.onrender.com/${emp.userId.profileImage}
  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Employee Details</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Left Side - Profile Image */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 mr-0 md:mr-8 mb-4 md:mb-0">
              <img
                src={`https://employee-mg-server.onrender.com/${leave.employeeId.userId.profileImage}`}
                alt="Profile-Image"
                className="w-full h-full rounded-full object-cover"
              />
              {/* Name overlay on the image */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center text-sm py-1 rounded-b-full">
                {leave.employeeId.userId.name}
              </div>
            </div>

            {/* Right Side - Employee Details */}
            <div className="flex-1">
              <div className="space-y-4">
                {/* Name Row */}
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Name:</span>
                  <span className="text-lg">{leave.employeeId.userId.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Employee ID:</span>
                  <span className="text-lg">{leave.employeeId.employeeId}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Date of Birth:</span>
                  <span className="text-lg">{new Date(leave.employeeId.dob).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Gender:</span>
                  <span className="text-lg">{leave.employeeId.gender}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Department:</span>
                  <span className="text-lg">{leave.employeeId.department.dep_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Start Date:</span>
                  <span className="text-lg">{new Date(leave.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold">End Date:</span>
                  <span className="text-lg">{new Date(leave.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold">{leave.status === 'pending' ? 'Action:' : 'Status:'}</span>
                  <span className="text-lg">{
                    leave.status === 'Pending' ? (
                      <div className='flex space-x-2' >
                        <button className='bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer' onClick={() => changeStatus(leave._id, "Approved")} >Approved</button>
                        <button className='bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer' onClick={() => changeStatus(leave._id, "Rejected")} >Rejected</button>
                      </div>
                    ) : <p className='font-medium'>{leave.status}</p>
                  }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl">Loading...</p>
        </div>
      )}
    </>
  );
};

export default LeaveDetails;
