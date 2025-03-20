import React, { useState } from "react";

import "./assets/student.css"; 
import { PostsDisplay } from "./Post";
import { FaBars, FaTimes } from "react-icons/fa"; // أيقونات القائمة والإغلاق
import { FaDownload } from "react-icons/fa";

import { Link } from "react-router-dom";


const student = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة القائمة

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // فتح/إغلاق القائمة
    };

    return (
        <div className="home-container">
                <nav className="top-navbar">
            <div className="navbar-logo">جمعية فضاء</div>

            {/* أيقونة القائمة */}
            <div className="menu-icon" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* قوائم النافبار */}
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
                        <a href="/base.apk" download> <FaDownload/></a>
                    </li>
            </ul>
        </nav>

            <main className="content">
                <PostsDisplay />
            </main>

        </div>
    );
};

export default student;
