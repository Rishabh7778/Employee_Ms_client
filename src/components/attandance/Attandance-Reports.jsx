import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReports = () => {
  const [report, setReport] = useState({});
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [error, setError] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching
    const query = new URLSearchParams({ limit, skip });
    if (dateFilter) {
      query.append("date", dateFilter);
    }

    try {
      const response = await axios.get(
        `https://employee-mg-server.onrender.com/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({ ...prevData, ...response.data.groupData }));
        }
      } else {
        console.warn("Data not received:", response.data);
        setError(response.data.error || "Failed to fetch report.");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(err.message);
    }
    setLoading(false);
  };

  // Reset pagination when date filter changes
  useEffect(() => {
    setSkip(0);
  }, [dateFilter]);

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Attendance Reports</h2>

      {/* Date Filter */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="font-medium">Filter by Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded px-3 py-1"
        />
      </div>

      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : Object.entries(report).length > 0 ? (
        Object.entries(report).map(([date, records]) => (
          <div key={date} className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{date}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="border px-4 py-2">S.No</th>
                    <th className="border px-4 py-2">Employee ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((data, i) => (
                    <tr key={`${date}-${i}`} className="text-center border">
                      <td className="border px-4 py-2">{i + 1}</td>
                      <td className="border px-4 py-2">{data.employeeId || "N/A"}</td>
                      <td className="border px-4 py-2">{data.employeeName || "N/A"}</td>
                      <td className="border px-4 py-2">{data.departmentName || "N/A"}</td>
                      <td
                        className={`border px-4 py-2 ${
                          data.status === "Present" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.status || "Not Marked"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No attendance data found.</div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setSkip((prev) => Math.max(0, prev - limit))}
          disabled={skip === 0}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setSkip((prev) => prev + limit)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Calendar & Current Date */}
      <div className="mt-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold">Today's Date</h3>
        <p className="text-gray-700">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AttendanceReports;
