import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getDepartments = async () => {
      const department = await fetchDepartments();
      setDepartments(department);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        `https://employee-mg-server.onrender.com/api/employee/add`,
        formDataObj,
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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            id="name"
            placeholder="Enter Name"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Employee ID */}
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            onChange={handleChange}
            id="employeeId"
            placeholder="Employee ID"
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
            id="designation"
            placeholder="Designation"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            id="dob"
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

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            id="email"
            placeholder="Email ID"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Marital Status */}
        <div>
          <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            id="maritalStatus"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            id="password"
            placeholder="Enter Password"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            id="salary"
            placeholder="Salary"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            onChange={handleChange}
            id="role"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleChange}
            name="image"
            id="image"
            accept="image/*"
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
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
