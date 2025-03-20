import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './assets/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !password) {
            toast.error("⚠️ الاسم وكلمة المرور مطلوبان!", { position: "top-right" });
            return;
        }

        axios.post('https://fadaa-2.onrender.com/login', { name, password })
            .then(result => {
                if (result.data.message === "Success") {
                    window.location.href = "/student";
                } else if (result.data === "No record found") {
                    toast.error("⚠️ الحساب غير موجود!", { position: "top-right" });
                } else if (result.data === "The password is incorrect") {
                    toast.error("⚠️ كلمة المرور غير صحيحة!", { position: "top-right" });
                } else {
                    toast.error(`⚠️ ${result.data}`, { position: "top-right" });
                }
            })
            .catch(err => {
                const errorMessage = err.response?.data?.message || "❌ حدث خطأ في الاتصال بالسيرفر!";
                toast.error(errorMessage, { position: "top-right" });
            });
    };

    return (
        <div className='login-container'>
            <ToastContainer /> 
            <div className="welcome-message">
                <h1> أهلاً بالعودة</h1>
                <h2>تسجيل الدخول</h2>
                <p>ليس لديك حساب؟</p>
                <Link to="/signup" className='btn-signup'>تسجيل حساب جديد</Link>
            </div>

            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name"><strong>الاسم</strong></label>
                        <input
                            type="text"
                            name="name"
                            placeholder='أدخل الاسم'
                            autoComplete='off'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">كلمة المرور</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="ادخل كلمة المرور"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="show-password-btn"
                            >
                                {showPassword ? "إخفاء" : "إظهار"}
                            </button>
                        </div>
                    </div>
                    <button type='submit' className='btn-submit'>تسجيل الدخول</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
