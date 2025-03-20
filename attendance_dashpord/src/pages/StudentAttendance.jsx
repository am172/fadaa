import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import './StudentAttendance.css'; // استيراد ملف CSS


const StudentAttendance = ({ house }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);



    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/attendance?house=${house}`);
                setAttendanceRecords(response.data);
            } catch (error) {
                console.error("خطأ في جلب البيانات", error);
            }
        };
        fetchAttendanceData();
    }, [house]);
    useEffect(() => {
        const calculateAttendancePercentage = () => {
            const studentStats = {};
            const uniqueDays = new Set();

            attendanceRecords.forEach((record) => {
                uniqueDays.add(record.date);

                record.students.forEach((student) => {
                    if (!studentStats[student.name]) {
                        studentStats[student.name] = { present: 0, total: 0 };
                    }
                    studentStats[student.name].total += 1; // عدد الأيام التي تم تسجيل الطالب فيها
                    if (student.status === "present") {
                        studentStats[student.name].present += 1; // عدد أيام الحضور
                    }
                });
            });

            const formattedData = Object.entries(studentStats).map(([name, stats]) => {
                const absentDays = stats.total - stats.present; // حساب أيام الغياب
                return {
                    name,
                    presentDays: stats.present,
                    absentDays,
                    totalDays: stats.total,
                    attendancePercentage: Math.min(100, Math.round((stats.present / stats.total) * 100)), // التأكد من عدم تجاوز 100%
                };
            });

            setStudentsData(formattedData);
            setFilteredData(formattedData);
        };


        if (attendanceRecords.length > 0) {
            calculateAttendancePercentage();
        }
    }, [attendanceRecords, house]);



    const handleLogout = () => {
        // حذف البيانات من localStorage
        localStorage.removeItem("isLoggedIn");
        // إعادة تعيين حالة الدخول
        setIsPasswordCorrect(false);
    };
    useEffect(() => {
        const results = studentsData.filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
    }, [searchTerm, studentsData]);

    return (

        <div className="student-attendance-container">
            {(
                <div className="sidebar">
                    <Link to="/dashboard">الرئيسية</Link>
                    <Link to="/dashboard/dashbord_attendance">سجل الغياب</Link>
                    <Link to="/dashboard/dashbord_Student"> الطلاب</Link>
                    <Link to="/dashboard/StudentAttendance">غياب كل طالب</Link>
                </div>
            )}
            <h2>نسب الحضور والغياب لكل طالب {house}</h2>
            {/* حقل البحث */}
            <input
                type="text"
                placeholder="ابحث عن الطالب..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>الطالب</th>
                        <th>أيام الحضور</th>
                        <th>أيام الغياب</th>
                        <th>نسبة الحضور</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.presentDays}</td>
                            <td>{student.absentDays}</td>
                            <td>{student.attendancePercentage}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAttendance;
