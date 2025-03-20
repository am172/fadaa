import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './HouseAttendance.css';


const HouseAttendance = () => {
    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // جلب البيوت عند تحميل الصفحة
    useEffect(() => {
        const fetchHouses = async () => {
            const response = await axios.get("https://fadaa-2.onrender.com/api/attendance/houses");
            setHouses(response.data);
        };
        fetchHouses();
    }, []);

    // التحقق من كلمة السر
    const handlePasswordSubmit = () => {
        const house = houses.find((house) => house.password === enteredPassword);
        if (house) {
            setSelectedHouse(house);
            setIsPasswordCorrect(true);
        } else {
            alert("كلمة السر غير صحيحة!");
        }
    };

    // جلب بيانات الطلاب بعد التحقق من كلمة السر
    useEffect(() => {
        if (selectedHouse) {
            const fetchAttendanceData = async () => {
                try {
                    const response = await axios.get(`hhttps://fadaa-2.onrender.com/api/attendance?house=${selectedHouse.name}`);
                    const attendanceData = response.data.find(item => item.house === selectedHouse.name);  // ابحث عن البيت المحدد
                    
                    // تحقق من البيانات التي تم جلبها
                    console.log("بيانات الحضور:", attendanceData);
                    
                    if (attendanceData && attendanceData.students) {
                        const students = attendanceData.students.map((student) => {
                            const attendanceRecords = student.attendanceRecords || [];
                            
                            // تحقق من سجلات الحضور
                            console.log("سجلات الحضور للطالب " + student.name, attendanceRecords);
    
                            const totalDays = attendanceRecords.length;
                            const presentDays = attendanceRecords.filter((record) => record.status === 'present').length;
                            const absentDays = totalDays - presentDays;
                            const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
                            
                            console.log("الحضور: " + presentDays + " الغياب: " + absentDays + " النسبة: " + attendancePercentage);
    
                            return {
                                name: student.name,
                                presentDays,
                                absentDays,
                                attendancePercentage,
                            };
                        });
                        setStudentsData(students);
                    } else {
                        console.log("لا توجد بيانات للطلاب.");
                    }
                } catch (error) {
                    console.error("حدث خطأ أثناء جلب بيانات الغياب:", error);
                }
            };
            fetchAttendanceData();
        }
    }, [selectedHouse]);
    

    // اختيار الطالب
    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
    };

    return (
        <div className="house-attendance-container">
            
            <h1>إدارة الحضور - البيت: {selectedHouse ? selectedHouse.name : ""}</h1>

            {/* حقل إدخال كلمة السر */}
            {!isPasswordCorrect && (
                <div className="password-card">
                    <h2>أدخل كلمة السر</h2>
                    <input
                        type="password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                        placeholder="كلمة السر"
                    />
                    <button onClick={handlePasswordSubmit}>تأكيد</button>
                </div>
            )}

            {/* قائمة الطلاب بعد التحقق من كلمة السر */}
            {isPasswordCorrect && (
                <div className="students-list">
                    <h2>اختر الطالب</h2>
                    <ul>
                        {studentsData.map((student, index) => (
                            <li key={index} onClick={() => handleStudentSelect(student)}>
                                {student.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* عرض بيانات الطالب المحدد */}
            {selectedStudent && (
                <div className="student-details">
                    <h3>تفاصيل الطالب: {selectedStudent.name}</h3>
                    <p>أيام الحضور: {selectedStudent.presentDays}</p>
                    <p>أيام الغياب: {selectedStudent.absentDays}</p>
                    <div className="attendance-percentage">
                        <CircularProgressbar
                            value={selectedStudent.attendancePercentage}
                            text={`${selectedStudent.attendancePercentage}%`}
                            strokeWidth={10}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HouseAttendance;
