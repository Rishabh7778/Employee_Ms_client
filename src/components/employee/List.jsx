import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setfilteredEmployee] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      let sno = 1;
      // const BASE_URL = import.meta.env.VITE_BASE_URL;
      try {
        const response = await axios.get(`https://employee-mg-server.onrender.com/api/employee`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log("API Response:", response.data);
        if (response.data.success) {
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img src={`https://employee-mg-server.onrender.com/${emp.userId.profileImage}`} className="w-10 h-10 rounded-full" />,
            action: (<EmployeeButtons Id={emp._id} />)
          }));
          setEmployees(data); 
          setfilteredEmployee(data)  
        } else {
          console.warn("Invalid department data received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert(error.response?.data?.error || "Server Error!");
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp)=>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setfilteredEmployee(records);
  }

  return (
    <div>
      <h3 className="text-center text-xl font-semibold mb-4">Manage Employess</h3>
      <div className="flex justify-between items-center border p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by department name"
          className="border p-2 rounded-lg w-2/3"
        onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New Employees
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </div>
    </div>
  )
}

export default List;
