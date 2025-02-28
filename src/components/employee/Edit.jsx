import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: '',
    designation: '',
    department: '',
    maritalStatus: '',
    salary: 0
  });
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      // const BASE_URL = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/employee/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(response); // Check API response
        if (response.data.success) {
          // Use the correct property name based on your API response.
          // If your API returns { success: true, employees: {...} } use that.
          const emp = response.data.employees; 
          setEmployee({
            name: emp.userId.name,
            designation: emp.designation,
            // Assuming you want to store the department _id in the form
            department: emp.department._id,
            maritalStatus: emp.maritalStatus,
            salary: emp.salary
          });
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        alert(error.response?.data?.error || "Server Error!");
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const getDepartments = async () => {
      const department = await fetchDepartments();
      setDepartments(department);
    };
    getDepartments();
  }, []);

  // Update handleChange to update the employee state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  // Use the employee state to create form data and submit it
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://employee-mg-server.onrender.com/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                id="name"
                placeholder="Enter Name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Designation */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                value={employee.designation}
                id="designation"
                placeholder="Designation"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                value={employee.department}
                id="department"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                onChange={handleChange}
                value={employee.maritalStatus}
                id="maritalStatus"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                id="salary"
                placeholder="Salary"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Employee
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;
