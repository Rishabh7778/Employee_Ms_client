import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "S.No",
        selector: (row) => row.sno,
        width: "70px",
        style: {
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center"
        }
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "100px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "130px",
        style: {
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center"
        }
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: "150px",
        style: { textAlign: 'center' }
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px",
        style: {
            textAlign: 'center',
            fontSize: "14px",
            fontWeight: "bold"
        }
    },
    {
        name: "Action",
        selector: (row) => row.action,
        style: {
            textAlign: 'center',
            fontSize: "14px",
            fontWeight: "bold"
        }
    },
];


export const fetchDepartments = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/department`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data.departments || []; // Always return array
    } catch (error) {
        console.error("Error fetching departments:", error);
        return []; // Return empty array on error
    }
};

export const getEmployees = async (id) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/employee/department/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data.employees || [];
    } catch (error) {
        console.error("Error fetching employees:", error);
        return []; // Return empty array on error
    }
};

export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-2">
            <button
                className="px-3 py-1 bg-teal-500 text-white font-semibold rounded-md cursor-pointer hover:bg-teal-600 transition"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>
                View
            </button>
            <button
                className="px-3 py-1 bg-green-600 text-white font-semibold rounded-md cursor-pointer hover:bg-green-700 transition"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>
                Edit
            </button>
            <button
                className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-md cursor-pointer hover:bg-yellow-600 transition"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>
                Salary
            </button>
            <button
                onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
                className="px-3 py-1 bg-red-600 text-white font-semibold rounded-md cursor-pointer hover:bg-red-700 transition">
                Leave
            </button>
        </div>
    );
};