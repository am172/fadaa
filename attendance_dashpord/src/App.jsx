import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import StudentAttendance from "./pages/StudentAttendance";
import HouseAttendance from "./pages/HouseAttendance";
import Dashboardattendance from "./pages/Dashbord_attendance";//file has genral attendace
import DashbordStudent from "./pages/Dashord_students";
import { AdminPosts } from "./pages/Post";
import { PostsDisplay } from "./pages/Post";

import "./App.css";



const App = () => {
  return (
    <Router>
      {
      /* <nav>
        <Link to="/">تسجيل الغياب</Link>
        <Link to="/dashboard">داشبورد المدير</Link>
        <Link to="/HouseAttendance">طالب</Link>
        
      </nav> */
      }
      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/StudentAttendance" element={<StudentAttendance />} />
        <Route path="/dashboard/dashbord_attendance" element={<Dashboardattendance />} />
        <Route path="/HouseAttendance" element={<HouseAttendance />} />
        <Route path="/dashboard/dashbord_Student" element={<DashbordStudent />} />
        {/* <Route path="/dashboard/post" element={<AdminPosts />} />
        <Route path="/dashboard/display" element={<PostsDisplay />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

