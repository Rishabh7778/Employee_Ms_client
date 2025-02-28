import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditDepartment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [department, setDepartment] = useState({ dep_name: "", description: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            // const BASE_URL = import.meta.env.VITE_BASE_URL;
            try {
                const response = await axios.get(`https://employee-mg-server.onrender.com/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // console.log("Fetched Department:", response.data.department);
                if (response.data.success && response.data.department) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                console.error("Error fetching department:", error);
                alert(error.response?.data?.error || "Server Error!");
            } finally {
                setLoading(false);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Fixed: now e is defined
        try {
            const response = await axios.put(`https://employee-mg-server.onrender.com/api/department/${id}`, department, {
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
    }

    return (
        <>
            {loading ? <div>Loading....</div> :
                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] min-h-[400px]">
                        <h2 className="text-2xl font-semibold text-center mb-4">Update Department</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
                                    Department Name
                                </label>
                                <input
                                    name="dep_name"
                                    type="text"
                                    value={department.dep_name || ""}
                                    onChange={handleChange}
                                    placeholder="Enter Dep Name"
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={department.description || ""}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 h-28"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
                                Update Department
                            </button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default EditDepartment;
