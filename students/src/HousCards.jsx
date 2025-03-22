import React from "react";
import houses from "./data/houses"; // تأكد أن المسار صحيح
import "./assets/HouseCards.css"; // استيراد ملف التنسيق
import NavBAR from "./compontets/navBar";

const HousesList = () => {
    return (
        <>
        <NavBAR/>
        <div className="container">
            <h1>قائمة المنازل</h1>
            <div className="houses-grid">
                {houses.map((house, index) => (
                    <div key={index} className="house-card">
                        <h2>{house.name}</h2>
                        <p>المشرف: <span className="supervisor">{house.supervisor}</span></p>
                        <p>الطلاب:</p>
                        <ul className="students-list">
                            {house.students.map((student, idx) => (
                                <li key={idx}>{student}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default HousesList;
