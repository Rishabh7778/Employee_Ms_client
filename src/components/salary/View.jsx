import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  let sno = 1;

  const fetchSalaries = async () => {
    // const BASE_URL = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`https://employee-mg-server.onrender.com/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    if (!salaries || salaries.length === 0) return;
    const filteredRecords = salaries.filter((record) =>
      record.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overflow-x-auto p-5'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>Salary History</h2>
      </div>
      <div className='flex justify-end my-3'>
        <input
          type="text"
          placeholder='Search By Emp ID'
          className='border px-2 rounded-md py-0.5 border-gray-300'
          onChange={(e) => filterSalaries(e.target.value)}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">SNO</th>
              <th className="py-2 px-4 border">Emp ID</th>
              <th className="py-2 px-4 border">Salary</th>
              <th className="py-2 px-4 border">Allowance</th>
              <th className="py-2 px-4 border">Deduction</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary) => (
              <tr key={salary._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border text-center">{sno++}</td>
                <td className="py-2 px-4 border text-center">{salary.employeeId.employeeId}</td>
                <td className="py-2 px-4 border text-center">₹{salary.basicSalary}</td>
                <td className="py-2 px-4 border text-center">₹{salary.allowances}</td>
                <td className="py-2 px-4 border text-center">₹{salary.deductions}</td>
                <td className="py-2 px-4 border text-center">₹{salary.netSalary}</td>
                <td className="py-2 px-4 border text-center">
                  {new Date(salary.payDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};

export default View;
