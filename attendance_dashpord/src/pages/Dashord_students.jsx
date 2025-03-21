
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './dashbordStudent.css';
import { Link } from "react-router-dom";

const DashbordStudent = () => {
    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);
    const [sortBy, setSortBy] = useState(""); // "faculty", "city", "year"

    useEffect(() => {
        fetch("https://fadaa-2.onrender.com/students/stats")
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Error fetching stats:", err));

        fetch("https://fadaa-2.onrender.com/students")
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
            (selectedCity ? student.city === selectedCity : true) &&
            (selectedYear ? student.year === selectedYear : true)
        );

        setFilteredStudents(filteredData);
    }, [searchTerm, selectedFaculty, selectedCity, selectedYear, students]);

    const deleteStudent = (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا الطالب؟")) {
            fetch(`https://fadaa-2.onrender.com/students/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(() => {
                    const updatedStudents = students.filter(student => student._id !== id);
                    setStudents(updatedStudents);
                })
                .catch(err => console.error("Error deleting student:", err));
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingStudent({ ...editingStudent, [name]: value });
    };

    const updateStudent = () => {
        fetch(`https://fadaa-2.onrender.com/students/${editingStudent._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingStudent)
        })
            .then(res => res.json())
            .then(() => {
                const updatedStudents = students.map(student =>
                    student._id === editingStudent._id ? editingStudent : student
                );
                setStudents(updatedStudents);
                setEditingStudent(null);
            })
            .catch(err => console.error("Error updating student:", err));
    };

    // تجميع البيانات حسب الكلية أو المحافظة أو السنة
    const groupData = (data, key) => {
        const grouped = {};
        data.forEach((student) => {
            const groupKey = student[key];
            if (!grouped[groupKey]) {
                grouped[groupKey] = [];
            }
            grouped[groupKey].push(student);
        });
        return grouped;
    };

    // عرض الجداول المنفصلة
    const renderGroupedTables = () => {
        if (!sortBy) {
            // إذا ما تم اختيار ترتيب، نعرض جدول واحد
            return (
                <table className="w-full border-collapse border border-black-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">الاسم</th>
                            <th className="border p-2">الكلية</th>
                            <th className="border p-2">السنة</th>
                            <th className="border p-2">المحافظة</th>
                            <th className="border p-2">الفريق</th>
                            <th className="border p-2">رقم الهاتف</th>
                            <th className="border p-2">تعديل</th>
                            <th className="border p-2">حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{student.name}</td>
                                <td className="border p-2">{student.faculty}</td>
                                <td className="border p-2">{student.year}</td>
                                <td className="border p-2">{student.city}</td>
                                <td className="border p-2">{student.team}</td>
                                <td className="border p-2">{student.phone}</td>
                                <td className="border p-2">
                                    <button id="btn__edit" onClick={() => setEditingStudent(student)}><FaEdit /></button>
                                </td>
                                <td>
                                    <button id="btn__delete" onClick={() => deleteStudent(student._id)} ><MdDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            // إذا تم اختيار ترتيب، نعرض جداول منفصلة
            const groupedData = groupData(filteredStudents, sortBy);
            return Object.entries(groupedData).map(([groupKey, students]) => (
                <div key={groupKey} className="group-container mb-8">
                    <h2 className="text-xl font-bold mb-4">{sortBy === "faculty" ? "الكلية: " : sortBy === "city" ? "المحافظة: " : "السنة: "}{groupKey}</h2>
                    <table id="tabble" className="w-full border-collapse border border-black-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">الاسم</th>
                                <th className="border p-2">الكلية</th>
                                <th className="border p-2">السنة</th>
                                <th className="border p-2">المحافظة</th>
                                <th className="border p-2">الفريق</th>
                                <th className="border p-2">رقم الهاتف</th>
                                <th className="border p-2">تعديل</th>
                                <th className="border p-2">حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{student.name}</td>
                                    <td className="border p-2">{student.faculty}</td>
                                    <td className="border p-2">{student.year}</td>
                                    <td className="border p-2">{student.city}</td>
                                    <td className="border p-2">{student.team}</td>
                                    <td className="border p-2">{student.phone}</td>
                                    <td className="border p-2">
                                        <button id="btn__edit" onClick={() => setEditingStudent(student)}><FaEdit /></button>
                                    </td>
                                    <td>
                                        <button id="btn__delete" onClick={() => deleteStudent(student._id)} ><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ));
        }
    };

    return (
        <div className="dashboard-container p-4" style={{ marginBottom: "150px" }}>
            <div className="sidebar">
                <Link to="/dashboard">الرئيسية</Link>
                <Link to="/dashboard/dashbord_attendance">سجل الغياب</Link>
                <Link to="/dashboard/dashbord_Student"> الطلاب</Link>
                <Link to="/dashboard/StudentAttendance">غياب كل طالب</Link>
            </div>

            {/* حقول الفلترة والترتيب */}
            <div id="filter" className="filters flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="بحث عن الاسم..."
                    className="border p-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="selected">
                <select id="by__"
                    className="border p-2 rounded"
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                    <option value="">اختر الكلية</option>
                    {[...new Set(students.map(s => s.faculty))].map((faculty, index) => (
                        <option key={index} value={faculty}>{faculty}</option>
                    ))}
                </select>
                <select id="by__"
                    className="border p-2 rounded"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    <option value="">اختر المحافظة</option>
                    {[...new Set(students.map(s => s.city))].map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
                <select id="by__"
                    className="border p-2 rounded"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">اختر السنة</option>
                    {[...new Set(students.map(s => s.year))].map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
                <select id="by__"
                    className="border p-2 rounded"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">ترتيب حسب</option>
                    <option value="faculty">الكلية</option>
                    <option value="city">المحافظة</option>
                    <option value="year">السنة</option>
                </select>
                </div>
            </div>

            {/* عرض الجداول */}
            {renderGroupedTables()}

            {editingStudent && (
                <div className="modal">
                    <h2>تعديل بيانات الطالب</h2>
                    {Object.keys(editingStudent).map((key) => (
                        key !== "_id" && (
                            <input
                                id="edit__value"
                                key={key}
                                name={key}
                                value={editingStudent[key]}
                                onChange={handleEditChange}
                                className="border p-2 m-2 rounded"
                            />
                        )
                    ))}
                    <button className="btn" onClick={updateStudent}>حفظ</button>
                    <button onClick={() => setEditingStudent(null)}>إلغاء</button>
                </div>
            )}

            {stats && (
                <>
                    <h1 className="hh">احصائيات عن الطلاب</h1>
                    <div className="stats grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-500 p-4 rounded-lg">
                            <h2 className="text-lg">إجمالي عدد الطلاب</h2>
                            <p className="text-2xl font-bold">{stats.totalStudents}</p>
                        </div>
                        <div className="bg-green-500 p-4 rounded-lg">
                            <h2 className="text-lg">أكثر كلية بها طلاب</h2>
                            <p className="text-2xl font-bold">{stats.mostPopulatedFaculty?._id || "N/A"}</p>
                        </div>
                        <div className="bg-purple-500 p-4 rounded-lg">
                            <h2 className="text-lg">أكثر محافظة بها طلاب</h2>
                            <p className="text-2xl font-bold">{stats.mostPopulatedCity?._id || "N/A"}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashbordStudent;
