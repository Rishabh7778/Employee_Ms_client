import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.post(`https://employee-mg-server.onrender.com/api/department/add`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] min-h-[400px]">
                <h2 className="text-2xl font-semibold text-center mb-4">Add Department</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
                            Department Name
                        </label>
                        <input
                            name="dep_name"
                            type="text"
                            placeholder="Enter Dep Name"
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 h-28"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
