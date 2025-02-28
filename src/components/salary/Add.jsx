import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';

const Add = () => {
    const navigate = useNavigate();

    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null
    });
    const [departments, setDepartments] = useState([]); // Initialize as an empty array
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const department = await fetchDepartments();
                setDepartments(department);
            } catch (error) {
                setDepartments([]);
            } finally {
                setLoading(false);
            }
        };
        getDepartments();
    }, []);

    if (loading) {
        return <div>Loading departments...</div>;
    }

    const handleDepartment = async (e) => {
        try {
            const emps = await getEmployees(e.target.value);
            setEmployees(emps);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]); // Set to empty array in case of error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.post(
                `https://employee-mg-server.onrender.com/api/salary/add`,
                salary,
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
            <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Department */}
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select
                            name="department"
                            onChange={handleDepartment}
                            id="department"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => ( // Now safe to map
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Employees */}
                    <div>
                        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                            Employees
                        </label>
                        <select
                            name="employeeId"
                            onChange={handleChange}
                            id="employeeId"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Employees</option>
                            {employees.map((emp) => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.employeeId}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700">
                            Basic salary
                        </label>
                        <input
                            type="number"
                            name="basicSalary"
                            onChange={handleChange}
                            id="basicSalary"
                            placeholder="basic Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Allowance */}
                    <div>
                        <label htmlFor="allowances" className="block text-sm font-medium text-gray-700">
                            Allowance
                        </label>
                        <input
                            type="number"
                            name="allowances"
                            onChange={handleChange}
                            id="allowances"
                            placeholder="Allowances"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Deduction */}
                    <div>
                        <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">
                            Deductions
                        </label>
                        <input
                            type="number"
                            name="deductions"
                            onChange={handleChange}
                            id="deductions"
                            placeholder="deductions"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Pay Date */}
                    <div>
                        <label htmlFor="payDate" className="block text-sm font-medium text-gray-700">
                            Pay date
                        </label>
                        <input
                            type="date" // Changed to type="date" for proper date input
                            name="payDate"
                            onChange={handleChange}
                            id="payDate"
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
                            Add Salary
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Add;