
import { useEffect, useState, useMemo } from "react";
import "./assets/dashbordStudent.css";
import NavBAR from "./compontets/navBar";

const DashbordStudent = () => {
    const [stats, setStats] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await fetch("https://fadaa-2.onrender.com/students/stats");
                const statsData = await statsResponse.json();
                setStats(statsData);

                const studentsResponse = await fetch("https://fadaa-2.onrender.com/students");
                const studentsData = await studentsResponse.json();
                setStudents(studentsData);
            } catch (err) {
                setError("Error fetching data");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.includes(searchTerm) &&
            (selectedFaculty ? student.faculty === selectedFaculty : true) &&
            (selectedCity ? student.city === selectedCity : true)
        );
    }, [searchTerm, selectedFaculty, selectedCity, students]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <NavBAR />
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
                        {filteredStudents.map((student, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{student.name}</td>
                                <td className="border p-2">{student.faculty}</td>
                                <td className="border p-2">{student.year}</td>
                                <td className="border p-2">{student.city}</td>
                                <td className="border p-2">{student.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DashbordStudent;
