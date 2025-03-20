import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const Dashboard = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [selectedHouse, setSelectedHouse] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);


    // جلب البيانات من السيرفر
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get("https://fadaa-2.onrender.com/api/attendance");
                setAttendanceRecords(response.data);
            } catch (error) {
                console.error("خطأ في جلب البيانات", error);
            }
        };
        fetchRecords();
    }, []);
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsPasswordCorrect(true);
        }
    }, []);


    // ميزة تسجيل الخروج
    const handleLogout = () => {
        // حذف البيانات من localStorage
        localStorage.removeItem("isLoggedIn");
        // إعادة تعيين حالة الدخول
        setIsPasswordCorrect(false);
    };

    // تجميع البيانات لكل بيت
    const groupByHouse = () => {
        const grouped = {};
        attendanceRecords.forEach((record) => {
            if (!grouped[record.house]) {
                grouped[record.house] = [];
            }
            grouped[record.house].push(record);
        });
        return grouped;
    };

    // حساب نسبة الحضور لكل طالب
    const calculateAttendancePercentage = (records) => {
        const totalDays = records.length;
        const percentages = {};

        records.forEach((record) => {
            record.students.forEach((student) => {
                if (!percentages[student.name]) percentages[student.name] = { present: 0 };
                if (student.status === "present") percentages[student.name].present += 1;
            });
        });

        // حساب النسبة
        Object.keys(percentages).forEach((name) => {
            percentages[name].percentage = Math.round((percentages[name].present / totalDays) * 100);
        });


        return percentages;
    };

    const groupedRecords = groupByHouse();

    return (
        <>


            {/* {!isSidebarVisible && (
                <button className="showSidebarButton" onClick={() => setIsSidebarVisible(true)}>
                    &gt;
                </button>
            )} */}

            {/* عرض البيانات بعد التحقق */}
            {(
                <div>
                    <div className="sidebar">
                        <Link to="/dashboard">الرئيسية</Link>
                        <Link to="/dashboard/dashbord_attendance">سجل الغياب</Link>
                        <Link to="/dashboard/dashbord_Student"> الطلاب</Link>
                        <Link to="/dashboard/StudentAttendance">غياب كل طالب</Link>
                    </div>
                    {/* <h2>اختر البيت:</h2> */}
                    <select onChange={(e) => setSelectedHouse(e.target.value)} value={selectedHouse}>
                        <option value="">كل البيوت</option>
                        {Object.keys(groupedRecords).map((house, index) => (
                            <option key={index} value={house}>{house}</option>
                        ))}

                    </select>
                    {Object.entries(groupedRecords).map(([house, records]) => {
                        if (selectedHouse && selectedHouse !== house) return null;
                        const percentages = calculateAttendancePercentage(records);
                        return (
                            <div key={house} className="houseContainer">
                                <h2 className="house">{house}</h2>
                                <table id="attendand" className="attendance">
                                    <thead>
                                        <tr>
                                            <th>التاريخ</th>
                                            {records[0].students.map((student, idx) => (
                                                <th key={idx}>{student.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((record, idx) => (
                                            <tr key={idx}>
                                                <td>{record.date}</td>
                                                {record.students.map((student, studentIdx) => (
                                                    <td key={studentIdx}>
                                                        {student.status === "present" ? "✅" : "❌"}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        {/* إضافة صف لنسبة الحضور */}
                                        <tr>
                                            <td><strong>نسبة الحضور</strong></td>
                                            {records[0].students.map((student, idx) => (
                                                <td key={idx}>
                                                    {percentages[student.name]?.percentage || "0"}%
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* // </div> */}
        </>

    );
};

export default Dashboard;
