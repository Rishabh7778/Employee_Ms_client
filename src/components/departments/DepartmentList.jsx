import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // Handle department deletion
  const onDepartmentDelete = (deletedId) => {
    setDepartments((prev) => prev.filter((dep) => dep._id !== deletedId));
    setFilteredDepartments((prev) => prev.filter((dep) => dep._id !== deletedId));
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      let sno = 1;
      // const BASE_URL = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/department`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success && Array.isArray(response.data.departments)) {
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
            ),
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        } else {
          console.warn("Invalid department data received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert(error.response?.data?.error || "Server Error!");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);


  const filterDepartments = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilteredDepartments(departments.filter((dep) => dep.dep_name.toLowerCase().includes(searchValue)));
  };

  return (
    <>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="p-4 md:p-6">
          <h3 className="text-center text-xl font-semibold mb-4">Manage Department</h3>

          {/* Search Bar & Add Button */}
          <div className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg shadow-md gap-4">
            <input
              type="text"
              placeholder="Search by department name"
              className="border p-2 rounded-lg w-full md:w-2/3"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full md:w-auto text-center"
            >
              Add New Department
            </Link>
          </div>

          {/* Responsive Table */}
          <div className="mt-4 overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              responsive
              className="w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
