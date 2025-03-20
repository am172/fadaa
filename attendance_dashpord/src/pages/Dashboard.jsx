import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AdminPosts } from "./Post";

const Dashboard = () => {
    const [password, setPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("isLoggedIn");
        if (storedLoginStatus === "true") {
            setIsPasswordCorrect(true);
        }
    }, []);

    const handlePasswordSubmit = async () => {
        try {
            const response = await axios.post("https://fadaa-2.onrender.com/api/check-password", { password });
            if (response.data.message === "كلمة السر صحيحة") {
                setIsPasswordCorrect(true);
                localStorage.setItem("isLoggedIn", "true");
            } else {
                setErrorMessage("كلمة المرور غير صحيحة");
            }
        } catch (error) {
            setErrorMessage("حدث خطأ أثناء التحقق من كلمة المرور");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsPasswordCorrect(false);
    };

    const handleChangePassword = async () => {
        try {
            const response = await axios.post("https://fadaa-2.onrender.com/api/change-password", {
                oldPassword,
                newPassword
            });

            if (response.data.message === "تم تغيير كلمة السر بنجاح") {
                setSuccessMessage("تم تغيير كلمة السر بنجاح!");
                setErrorMessage("");
                
            } else {
                setErrorMessage("كلمة السر القديمة غير صحيحة");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("حدث خطأ أثناء تغيير كلمة السر");
            setSuccessMessage("");
        }
    };

    return (
        <div className="container">
            
            {!isPasswordCorrect ? (
                <div className="passwordCard">
                    <h1 style={{color:"black" , textAlign:"center"}}>DASHBOARD</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ادخل كلمة السر"
                    />
                    <button style={{ width: "100%" }} onClick={handlePasswordSubmit}>تأكيد</button>
                    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                </div>
            ) : (
                <>
                    {/* CREATE POST */}
                    
                    <AdminPosts/>









                    <div className="sidebar">
                        <Link to="/dashboard">الرئيسية</Link>
                        <Link to="/dashboard/dashbord_attendance">سجل الغياب</Link>
                        <Link to="/dashboard/dashbord_Student"> الطلاب</Link>
                        <Link to="/dashboard/StudentAttendance">غياب كل طالب</Link>
                        <button onClick={handleLogout}>تسجيل الخروج</button>
                        <button onClick={() => document.getElementById('change_password').scrollIntoView({ behavior: 'smooth' })}>تغيير كلمة السر</button>
                    </div>

                    { (
                        <div
                            id="change_password"
                        >
                            <h3 style={{ color: "#333", marginBottom: "15px" }}>تغيير كلمة السر</h3>

                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="كلمة السر القديمة"
                                style={{
                                    width: "95%",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    outline: "none",
                                }}
                            />

                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="كلمة السر الجديدة"
                                style={{
                                    width: "95%",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    outline: "none",
                                }}
                            />

                            <button
                                onClick={handleChangePassword}
                                style={{
                                    background: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px 15px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    width: "100%",
                                }}
                            >
                                تأكيد التغيير
                            </button>

                            {errorMessage && (
                                <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
                                    {errorMessage}
                                </div>
                            )}

                            {successMessage && (
                                <div style={{ color: "green", marginTop: "10px", fontSize: "14px" }}>
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    )}

                </>
            )}
        </div>
    );
};

export default Dashboard;
