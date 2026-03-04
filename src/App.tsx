import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AttendanceProvider } from './context/AttendanceContext';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

// Personal Records
import EmployeeList from './pages/personal-records/EmployeeList';
import EmployeeProfile from './pages/personal-records/EmployeeProfile';

// Attendance
import AttendanceTable from './pages/attendance/AttendanceTable';

// Leave Management
import LeaveManagement from './pages/leave/LeaveManagement';

// Payroll
import Payroll from './pages/payroll/Payroll';

// Government Compliance
import GovernmentCompliance from './pages/compliance/GovernmentCompliance';

// Employee Self-Service
import EmployeeSelfService from './pages/self-service/EmployeeSelfService';
import MyAttendance from './pages/self-service/MyAttendance';
import MyLeave from './pages/self-service/MyLeave';

// Asset Management
import AssetManagement from './pages/assets/AssetManagement';

// Clearance
import ClearanceList from './pages/clearance/ClearanceList';
import ClearanceForm from './pages/clearance/ClearanceForm';

// HRIS System
import HRISSystem from './pages/HRISSystem';

// Admin Settings
import AdminSettings from './pages/admin/AdminSettings';

import './App.css';

// Route guard component that redirects user-role users away from admin-only pages
const AdminOnly = ({ children }: { children: React.ReactNode }) => {
  const { role, isLoggedIn } = useAuth();
  
  // Check if the user is logging out/not logged in first
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Then check if they have admin privileges
  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* Admin-only pages */}
        <Route path="personal-records" element={<AdminOnly><EmployeeList /></AdminOnly>} />
        <Route path="employee/:id" element={<AdminOnly><EmployeeProfile /></AdminOnly>} />
        <Route path="attendance" element={<AdminOnly><AttendanceTable /></AdminOnly>} />
        <Route path="leave" element={<AdminOnly><LeaveManagement /></AdminOnly>} /> 
        <Route path="payroll" element={<AdminOnly><Payroll /></AdminOnly>} />
        <Route path="assets" element={<AdminOnly><AssetManagement /></AdminOnly>} />
        <Route path="clearance" element={<AdminOnly><ClearanceList /></AdminOnly>} />
        <Route path="clearance/:id" element={<AdminOnly><ClearanceForm /></AdminOnly>} />
        <Route path="hris" element={<AdminOnly><HRISSystem /></AdminOnly>} />
        <Route path="settings" element={<AdminOnly><AdminSettings /></AdminOnly>} />

        {/* Shared pages (both user and admin) */}
        <Route path="compliance" element={<GovernmentCompliance />} />
        
        {/* Employee Self-Service Pages */}
        <Route path="my-attendance" element={<MyAttendance />} />
        <Route path="my-leave" element={<MyLeave />} />
        <Route path="self-service" element={<EmployeeSelfService />} />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AttendanceProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;