import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  //  const STATIC_URL = "https://employee-mg-server.onrender.com/"

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setEmployee(response.data.employees);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        alert(error.response?.data?.error || "Server Error!");
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Employee Details</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Left Side - Profile Image */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 mr-0 md:mr-8 mb-4 md:mb-0">
              <img
                src={`https://employee-mg-server.onrender.com/${employee?.userId?.profileImage}`}
                alt="Profile-Image"
                className="w-full h-full rounded-full object-cover"
              />
              {/* Name overlay on the image */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center text-sm py-1 rounded-b-full">
                {employee.userId.name}
              </div>
            </div>

            {/* Right Side - Employee Details */}
            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Name:</span>
                  <span className="text-lg">{employee.userId.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Employee ID:</span>
                  <span className="text-lg">{employee.employeeId}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Date of Birth:</span>
                  <span className="text-lg">{new Date(employee.dob).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Gender:</span>
                  <span className="text-lg">{employee.gender}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-lg font-bold">Department:</span>
                  <span className="text-lg">{employee.department.dep_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Marital Status:</span>
                  <span className="text-lg">{employee.maritalStatus}</span>
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

export default View;
