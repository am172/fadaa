import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attendance.css";

const Attendance = () => {
    const [houses, setHouses] = useState([]);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState("");
    const [attendanceExists, setAttendanceExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // تحميل البيوت من الـ backend
    useEffect(() => {
        const fetchHouses = async () => {
            const response = await axios.get("https://fadaa-2.onrender.com/api/attendance/houses");
            setHouses(response.data);
        };
        fetchHouses();
    }, []);

    // التحقق مما إذا كان الغياب مسجلًا مسبقًا لهذا البيت والتاريخ
    useEffect(() => {
        if (selectedHouse && date) {
            const savedAttendanceExists = localStorage.getItem(`${selectedHouse.name}_${date}_attendanceExists`);
            setAttendanceExists(savedAttendanceExists === "true");
        }
    }, [selectedHouse, date]);

    // حذف بيانات الغياب تلقائيًا عند بداية يوم جديد
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
        const lastSavedDate = localStorage.getItem("lastAttendanceDate");
        setDate(today);
        if (lastSavedDate !== today) {
            localStorage.clear(); // يمسح كل بيانات الغياب
            localStorage.setItem("lastAttendanceDate", today);
        }
    }, []);



    // التأكد من كلمة السر واختيار البيت
    const handlePasswordSubmit = () => {
        const house = houses.find((house) => house.password === enteredPassword);
        if (house) {
            setSelectedHouse(house);
            setIsPasswordCorrect(true);

            const savedAttendance = JSON.parse(localStorage.getItem(`${house.name}_${date}`));
            if (savedAttendance) {
                setStudents(savedAttendance);
            } else {
                const initialStudents = house.students.map((name) => ({
                    name,
                    status: "present",
                }));
                setStudents(initialStudents);
            }
        } else {
            alert("كلمة السر غير صحيحة!");
        }
    };

    // تحديث حالة الحضور/الغياب للطالب وحفظها في localStorage
    const handleStatusChange = (index, status) => {
        const updatedStudents = [...students];
        updatedStudents[index].status = status;
        setStudents(updatedStudents);

        localStorage.setItem(`${selectedHouse.name}_${date}`, JSON.stringify(updatedStudents));
    };

    // حفظ الغياب في الـ backend و localStorage
    const handleSubmit = async () => {
        if (attendanceExists) {
            alert("تم تسجيل الغياب لهذا البيت بالفعل في هذا اليوم!");
            return;
        }
        setIsLoading(true);
        try {
            await axios.post("https://fadaa-2.onrender.com/api/attendance", {
                date: date,
                house: selectedHouse.name,
                students,
            });

            alert("تم تسجيل الغياب بنجاح");

            setAttendanceExists(true);
            localStorage.setItem(`${selectedHouse.name}_${date}`, JSON.stringify(students));
            localStorage.setItem(`${selectedHouse.name}_${date}_attendanceExists`, "true");
        } catch (error) {
            alert("حدث خطأ أثناء تسجيل الغياب");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="title">تسجيل الغياب</h1>

            <div className="attendance-container">
                {!isPasswordCorrect && (
                    <div className="password-card new-card">
                        <input
                            type="password"
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
                            placeholder="ادخل كلمة السر "
                        />
                        <button className="submit-button" onClick={handlePasswordSubmit}>
                            تأكيد
                        </button>
                    </div>
                )}

                {isPasswordCorrect && (

                    <div className="table-container">
                        <div className="date-picker">
                            <label>اختر التاريخ:</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <h2>{selectedHouse.name}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>اسم الطالب</th>
                                    <th>الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>
                                            <select
                                                value={student.status}
                                                onChange={(e) => handleStatusChange(index, e.target.value)}
                                            >
                                                <option value="present">حاضر</option>
                                                <option value="absent">غائب</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={handleSubmit}
                            disabled={attendanceExists || isLoading}
                            style={{
                                backgroundColor: attendanceExists || isLoading ? "#888" : "#007bff",
                                color: "#fff",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "5px",
                                cursor: attendanceExists || isLoading ? "default" : "pointer",
                                fontSize: "16px",
                                width: "100%",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            {isLoading ? "جاري الحفظ..." : attendanceExists ? "الغياب مُسجل بالفعل" : "حفظ الغياب"}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Attendance;
