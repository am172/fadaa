import React from 'react'
import { Link } from 'react-router-dom'
const sider = () => {
    return (
        <div className="sidebar">
        <Link to="/dashboard">الرئيسية</Link>
        <Link to="/dashboard/dashbord_attendance">سجل الغياب</Link>
        <Link to="/dashboard/dashbord_Student">الطلاب</Link>
        <Link to="/dashboard/StudentAttendance">غياب الطلاب</Link>
    </div>
    )
}

export default sider
