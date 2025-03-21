import React, { useEffect, useState } from "react";
import "./assets/dashbordStudent.css";
import NavBAR from "./compontets/navBar";
import { FaBars, FaTimes } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";

const DashbordStudent = () => {
    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); 
    };

    useEffect(() => {
        fetch("https://fadaa-2.onrender.com/students/stats")
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching stats:", err));

        fetch("http://localhost:5000/students")
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                setFilteredStudents(data);
            })
            .catch(err => console.error("Error fetching students:", err));
    }, []);

    useEffect(() => {
        let filteredData = students.filter(student =>
            student.name.includes(searchTerm) &&
            (selectedFaculty ? student.faculty === selectedFaculty : true) &&
            (selectedCity ? student.city === selectedCity : true)
        );
        setFilteredStudents(filteredData);
    }, [searchTerm, selectedFaculty, selectedCity, students]);

   return (

        <>

            <nav className="top-navbar">
                <div className="navbar-logo">جمعية فضاء</div>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
                    <li>
                        <Link to="/student/news">أخر الأخبار</Link>
                    </li>
                    <li>
                        <Link to="/student/houses">البيوت</Link>
                    </li>
                    <li>
                        <Link to="/student/students">الطلاب</Link>
                    </li>
                    <li>
                        <a href="/base.apk" download> <FaDownload /></a>
                    </li>

                </ul>
            </nav>
            <div className="dashboard-container p-4">


                {/* حقول الفلترة */}
                <div className="filters flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="بحث عن الاسم..."
                        className="border p-2 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="border p-2 rounded"
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                    >
                        <option value="">اختر الكلية</option>
                        {[...new Set(students.map(s => s.faculty))].map((faculty, index) => (
                            <option key={index} value={faculty}>{faculty}</option>
                        ))}
                    </select>
                    <select
                        className="border p-2 rounded"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value="">اختر المحافظة</option>
                        {[...new Set(students.map(s => s.city))].map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* جدول البيانات */}
                <table className="w-full border-collapse border border-black-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">الاسم</th>
                            <th className="border p-2">الكلية</th>
                            <th className="border p-2">السنة</th>
                            <th className="border p-2">المحافظة</th>
                            <th className="border p-2">رقم الهاتف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(
                            filteredStudents.map((student, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{student.name}</td>
                                    <td className="border p-2">{student.faculty}</td>
                                    <td className="border p-2">{student.year}</td>
                                    <td className="border p-2">{student.city}</td>
                                    <td className="border p-2">{student.phone}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DashbordStudent
