import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "S.No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Do you want to delete?");
        if (confirmDelete) {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            try {
                const response = await axios.delete(`https://employee-mg-server.onrender.com/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete(id);
                }

            } catch (error) {
                console.error("Error deleting department:", error);
                alert(error.response?.data?.error || "Server Error!");
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-teal-500 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(Id)}>
                Delete
            </button>
        </div>
    );
};
