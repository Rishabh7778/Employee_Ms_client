import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ProtectedRoute from "./utils/ProtectedRoute";
import RoleBaseRoute from "./utils/RoleBaseRoute";
import Unauthor from './pages/Unauthorized';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import List from './components/employee/List';
import LeaveList from './components/leaves/List';
import Add from './components/employee/Add';
import AddSalary from './components/salary/Add';
import View from './components/employee/View';
import ViewSalary from './components/salary/View';
import Edit from './components/employee/Edit';
import Summary from './components/employeDashboard/Summary';
import AddLeave from './components/leaves/AddLeave';
import Setting from './components/employeDashboard/Setting';
import Table from './components/leaves/Table';
import LeaveDetails from './components/leaves/LeaveDetails';
import Attandance from './components/attandance/Attandance';
import AttandanceReports from './components/attandance/Attandance-Reports';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin-dashboard/login' element={<Login />} />
        {/* Nest the AdminSummary route under /admin-dashboard */}
        <Route path='/admin-dashboard' element={
          <ProtectedRoute>
            <RoleBaseRoute requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoute>
          </ProtectedRoute>
        }>
          <Route index element={<AdminSummary />} />
          <Route path='/admin-dashboard/departments' element={<DepartmentList />} />
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />} />
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />} />
          <Route path='/admin-dashboard/employees' element={<List />} />
          <Route path='/admin-dashboard/add-employee' element={<Add />} />
          <Route path='/admin-dashboard/employees/:id' element={<View />} />
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />} />
          <Route path='/admin-dashboard/salary/add' element={<AddSalary />} />
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />} />
          <Route path='/admin-dashboard/leaves' element={<Table />} />
          <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetails />} />
          <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />} />
          <Route path='/admin-dashboard/setting' element={<Setting />} />
          <Route path='/admin-dashboard/attandance' element={<Attandance />} />
          <Route path='/admin-dashboard/attandanceReport' element={<AttandanceReports />} />
        </Route>
        <Route
          path='/employee-dashboard'
          element={
            <ProtectedRoute>
              <RoleBaseRoute requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<Summary />} />
          <Route path='/employee-dashboard/profile/:id' element={<View />} />
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />} />
          <Route path='/employee-dashboard/add-leave' element={<AddLeave />} />
          <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />} />
          <Route path='/employee-dashboard/setting' element={<Setting />} />
        </Route>
        <Route path='/unauthorized' element={<Unauthor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
