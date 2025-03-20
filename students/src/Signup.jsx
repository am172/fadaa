import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './assets/signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [faculty, setFaculty] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [year, setYear] = useState("");
    const [id, setId] = useState("");

    const navigate = useNavigate();

    const allowedIds = ["12345", "67890", "54321", "09876"]; 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!allowedIds.includes(id)) {
            toast.error("الـ ID غير صحيح، يرجى التحقق منه!");
            return;
        }

        axios.post('http://localhost:5000/register', { name, password, faculty, phone, city, year, id })
            .then(result => {
                console.log(result);
                toast.success("تم تسجيل الحساب بنجاح!", {
                    position: "top-center",
                    autoClose: 1500,
                });
                setTimeout(() => navigate('/login'), 1500);
            })
            .catch(err => {
                console.log(err);
                toast.error("حدث خطأ أثناء التسجيل، حاول مرة أخرى");
            });
    };

    const faculties = [
        "إعلام", "آثار", "أصول الدين", "اقتصاد وعلوم سياسية", "التربية", "التربية الرياضية", 
        "التجارة", "الحقوق", "الزراعة", "الطب", "الطب البيطري", "الصيدلة", "العلوم", 
        "الهندسة", "الحاسبات والمعلومات", "طب الأسنان", "فنونة تطبيقية", "فنون جميلة", 
        "كلية الدراسات الإسلامية والعربية", "كلية الشريعة والقانون", "كلية الطب البشري بالأزهر", 
        "كلية الصيدلة بالأزهر", "كلية الهندسة بالأزهر", "كلية الزراعة بالأزهر", 
        "كلية التربية بالأزهر", "كلية العلوم بالأزهر", "كلية التجارة بالأزهر", 
        "كلية الدراسات الإنسانية بالأزهر", "كلية أصول الدين بالأزهر", "كلية اللغة العربية بالأزهر"
    ];

    const cities = [
        "القاهرة", "الجيزة", "الإسكندرية", "القليوبية", "بورسعيد", "الإسماعيلية", "السويس", 
        "دمياط", "الدقهلية", "الشرقية", "الغربية", "المنوفية", "كفر الشيخ", "الفيوم", "بني سويف", 
        "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", 
        "مطروح", "شمال سيناء", "جنوب سيناء", "روسيا"
    ];

    const years = ["السنة الأولى", "السنة الثانية", "السنة الثالثة", "السنة الرابعة", "السنة الخامسة"];

    return (
        <div className="container_signup">
            <ToastContainer />
            <div id='welcome-message'>
                <h1 style={{ color: "white" }}>أهلاً</h1>
                <br />
                <h2>إنشاء حساب جديد</h2>
                <br />
                <div className="sa7by">
                <p>هل لديك حساب بالفعل؟</p>
                <Link to="/login" className="link-btn">
                    تسجيل الدخول
                </Link>
                </div>
                
            </div>

            <div className='signup-form'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="ادخل اسمك"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="ادخل كلمة المرور"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="show-password-btn"
                                style={{ display: "flex" }}
                            >
                                {showPassword ? "إخفاء" : "إظهار"}
                            </button>
                        </div>
                    </div>
                    <br />
                    <div>
                        <input
                            type="text"
                            placeholder="ادخل الـ ID الخاص بك"
                            onChange={(e) => setId(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <input
                            list="faculties-list"
                            placeholder="اختر كليتك"
                            onChange={(e) => setFaculty(e.target.value)}
                            required
                        />
                        <datalist id="faculties-list">
                            {faculties.map((faculty, index) => (
                                <option key={index} value={faculty} />
                            ))}
                        </datalist>
                    </div>
                    <br />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0" }}>
                        <input
                            type="tel"
                            placeholder="رقم الهاتف"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            pattern="[0-9]{10,15}"
                            maxLength="15"
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                fontSize: "16px",
                                direction: "rtl",
                            }}
                        />
                    </div>
                    <br />
                    <div>
                        <input
                            list="cities-list"
                            placeholder="اختر المحافظة"
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <datalist id="cities-list">
                            {cities.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>
                    </div>
                    <br />
                    <div>
                        <select onChange={(e) => setYear(e.target.value)} required>
                            <option value="">اختر سنتك الدراسية</option>
                            {years.map((year, index) => <option key={index} value={year}>{year}</option>)}
                        </select>
                    </div>
                    <br />
                    <button type="submit" className="btn" id='submit'>
                        تسجيل
                    </button>
                </form>
            </div>

            <div className="sa7by2">
                <p>هل لديك حساب بالفعل؟</p>
                <Link to="/login" className="link-btn">
                    تسجيل الدخول
                </Link>
                </div>
        </div>
    );
}

export default Signup;