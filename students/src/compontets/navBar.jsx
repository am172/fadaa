import React, { useState } from "react";
import "../assets/student.css";
import { FaBars, FaTimes } from "react-icons/fa"; // أيقونات القائمة والإغلاق
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa"; 

const NavBAR = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة القائمة

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // فتح/إغلاق القائمة
    };

    return (
            <nav className="top-navbar">
                <div className="navbar-logo"> <Link className="navbar-logo" style={{ textDecoration: "none" }} to="/student"> فضاء</Link> </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>

                    <li>
                        <Link to="/student/houses">البيوت</Link>
                    </li>
                    <li>
                        <Link to="/student/students">الطلاب</Link>
                    </li>
                    <li>
                        <Link to="">مقالات</Link>
                    </li>
                    <li>
                        <a href="/base.apk" download> <FaDownload /></a>
                    </li>

                </ul>
            </nav>
    );
};

export default NavBAR;
