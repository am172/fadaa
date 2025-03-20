import React, { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuPlane } from "react-icons/lu";
import { SlLogin } from "react-icons/sl";
import img1 from "./assets/images/pexels-donaldtong94-55787.jpg";
import img2 from "./assets/images/pexels-donaldtong94-55787.jpg";
import img3 from "./assets/images/pexels-donaldtong94-55787.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import "./assets/home.css"; // استيراد ملف التنسيق

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    <li onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })}>
                        الرئيسية
                    </li>
                    <li onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
                        خدماتنا
                    </li>
                    <li onClick={() => document.getElementById('exercises').scrollIntoView({ behavior: 'smooth' })}>
                        الأنشطة
                    </li>
                    <li onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                        عنّا
                    </li>
                    <li onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                        تواصل معنا
                    </li>
                    <li onClick={() => window.location.href = "/login"}>
                        <SlLogin />
                    </li>
                </ul>
            </nav>

            <section id="hero" className="hero-section">
                <div className="hero-content">
                    <h1>جمعية فضاء لرعاية الطلاب</h1>
                    <p>مستقبل أفضل للأجيال القادمة</p>
                    <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                        اعرف أكثر عنا
                    </button>
                    <button>
                        <a href="#">تقديم الان</a>
                    </button>

                </div>
            </section>


            <section id="mission" className="mission-vision">
                <h1 className="miss"> لمستقبل أفضل للأجيال القادمة</h1>
                <p className="who">نسعى لخدمة المجتمع في مجالات التعليم ورعاية الطلاب.
                    من خلال تقديم المساعدة التعليمية والثقافية والاجتماعية.</p>
                <div className="container">
                    <div className="mission">
                        <GoGoal className="icon" />
                        <h2>رؤيتنا</h2>
                        <p>
                            الريادة في الجوانب التنموية والتعليمية والإنسانية لمساعدة المجتمع والشباب بشكل خاص، وزيادة الوعي العام لأفراد المجتمع والوصول بالمجتمع لأعلى درجات التقدم.
                        </p>
                    </div>
                    <div className="vision">
                        <FaMessage className="icon" />
                        <h2>رسالتنا</h2>
                        <p>
                            المشاركة في خدمة المجتمع في مجالات التعليم ورعاية الطلاب وتبادل الثقافات بين الشعوب ونشر السلام.
                        </p>
                    </div>
                </div>

            </section>

            {/* قسم الخدمات */}
            <section id="services" className="services">
                <h2>خدماتنا</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <FaHome className="icon_service" />
                        <h3>إقامة دور إيواء</h3>
                        <p>تقديم دور إيواء آمنة للطلاب المحتاجين.</p>
                    </div>
                    <div className="service-card">
                        <FaBook className="icon_service" />
                        <h3>فصول تقوية</h3>
                        <p>فتح فصول تقوية لمساعدة الطلاب في التحصيل الدراسي.</p>
                    </div>
                    <div className="service-card">
                        <FaPeopleGroup className="icon_service" />
                        <h3>الندوات</h3>
                        <p>تنظيم ندوات تثقيفية لزيادة الوعي.</p>
                    </div>
                    <div className="service-card">
                        <LuPlane className="icon_service" />
                        <h3>رحلات ثقافية</h3>
                        <p>تنظيم رحلات لتبادل الثقافات وتوسيع الآفاق.</p>
                    </div>
                </div>
            </section>
            {/* الانشطه */}
            <section id="exercises" className="exercises">
                <h2>الأنشطة والخدمات</h2>
                <div className="exercises-grid">
                    {/* المولد النبوي الشريف */}
                    <div className="exercises-card">
                        <h3>المولد النبوي الشريف</h3>
                        <p>
                            ذكرى مولد النبي محمد بن عبد الله، خاتم الأنبياء والمرسلين، الذي ولد في مكة المكرمة في 12 ربيع الأول من عام الفيل.
                        </p>
                        <button onClick={() => window.location.href = "/mawlid"}>إقرأ المزيد</button>
                    </div>

                    {/* الإسراء والمعراج */}
                    <div className="exercises-card">
                        <h3>الإسراء والمعراج</h3>
                        <p>
                            حادثة عظيمة جرت في ليلة السابع والعشرين من شهر رجب، حيث أسري بالنبي محمد عليه الصلاة والسلام من المسجد الحرام في مكة المكرمة إلى المسجد الأقصى في القدس الشريف.
                        </p>
                        <button onClick={() => window.location.href = "/isra"}>إقرأ المزيد</button>
                    </div>

                    {/* دعوات للإفطار في رمضان */}
                    <div className="exercises-card">
                        <h3>دعوات للإفطار في رمضان</h3>
                        <p>
                            شهر رمضان هو شهر الصيام والقيام، وهو شهر مبارك يملأ قلوب المسلمين بالفرح والسرور. وفي هذا الشهر الكريم، يحرص المسلمون على مشاركة الفرح مع الآخرين، وخاصة الفقراء والمحتاجين.
                        </p>
                        <button onClick={() => window.location.href = "/ramadan"}>إقرأ المزيد</button>
                    </div>

                    {/* عيد الأضحى */}
                    <div className="exercises-card">
                        <h3>عيد الأضحى</h3>
                        <p>
                            أحد أهم الأعياد الدينية عند المسلمين، ويحتفل به المسلمون في جميع أنحاء العالم في العاشر من شهر ذي الحجة، بعد انتهاء وقفة عرفات وأداء الحجاج ركن الحج الأعظم، وهو رمي جمرة العقبة الكبرى.
                        </p>
                        <button onClick={() => window.location.href = "/eid"}>إقرأ المزيد</button>
                    </div>

                    {/* حفلات التخرج */}
                    <div className="exercises-card">
                        <h3>حفلات التخرج</h3>
                        <p>
                            مناسبات خاصة تحتفل فيها الجامعات والمدارس بانتهاء الطلاب من دراستهم وحصولهم على الشهادات.
                        </p>
                        <button onClick={() => window.location.href = "/graduation"}>إقرأ المزيد</button>
                    </div>

                    {/* عرض الكتاب */}
                    <div className="exercises-card">
                        <h3>عرض الكتاب</h3>
                        <p>
                            أحداث ثقافية تهدف إلى تعزيز القراءة ومشاركة حب الكتب مع الآخرين.
                        </p>
                        <button onClick={() => window.location.href = "/books"}>إقرأ المزيد</button>
                    </div>
                </div>
            </section>

            {/* قسم عنا */}
            <section id="about" className="about">
                <div className="about-container">
                    {/* النص */}
                    <div className="about-text">
                        <h2>من نحن؟</h2>
                        <p>
                            جمعية فضاء هي جمعية خيرية تهدف إلى خدمة المجتمع في مجالات التعليم ورعاية الطلاب وتبادل الثقافات بين الشعوب ونشر السلام العالمي بين مختلف الأعراق والأجناس والقضاء على مشاكل العالم الثلاث: الجهل والفقر والصراع. وليس لجمعية فضاء أي توجه سياسي أو حزبي.
                        </p>
                        <p>
                            جمعية فضاء مقيدة تحت رقم: 7510 بتاريخ 22-12-2008 بمديرية الشئون الاجتماعية بالقاهرة.
                        </p>
                    </div>

                    {/* الصور */}
                    <div className="about-images">
                        <div className="image-container">
                            <img src={img1} alt="صورة 1" />
                            <div className="image-overlay">
                                <p>وصف الصورة الأولى هنا</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={img2} alt="صورة 2" />
                            <div className="image-overlay">
                                <p>وصف الصورة الثانية هنا</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={img3} alt="صورة 3" />
                            <div className="image-overlay">
                                <p>وصف الصورة الثالثة هنا</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={img3} alt="صورة 3" />
                            <div className="image-overlay">
                                <p>وصف الصورة الثالثة هنا</p>
                            </div>
                        </div>
                        <div className="image-container">
                            <img src={img3} alt="صورة 3" />
                            <div className="image-overlay">
                                <p>وصف الصورة الثالثة هنا</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* قسم تواصل معنا */}
            <section id="contact" className="contact">
                <div className="contact-container">
                    {/* العنوان */}
                    <h2>ابقَ دائمًا على تواصل</h2>
                    <p className="sub-text">نحن هنا لمساعدتك! تواصل معنا عبر أي من المنصات التالية.</p>

                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="فيسبوك" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="تويتر" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="إنستجرام" />
                        </a>
                        <a href="mailto:info@example.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" alt="إيميل" />
                        </a>
                    </div>
                    <div className="contact-info">
                        <div className="info-item">
                            <FaPhoneAlt className="social_icon" />
                            <p>(022) 111-1111</p>
                        </div>
                        <div className="info-item">
                            <GiPositionMarker className="social_icon" />
                            <p>
                                القطعة 7433 بلوك 26 المنطقة س الهضبة العليا – شارع الغد المشرق – خلف مسجد مستورة – المقطم
                            </p>
                        </div>
                    </div>
                    {/* أيقونات التواصل */}

                    {/* خريطة جوجل */}
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.909401653805!2d31.318069924610537!3d30.012030574939967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458393e3a91dda7%3A0xb257dd9ed39be432!2z2KzZhdi52YrYqSDZgdi22KfYoSDZhNix2LnYp9mK2Kkg2KfZhNi32YTYp9ioINin2YTZiNin2YHYr9mK2YY!5e1!3m2!1sar!2seg!4v1742359849366!5m2!1sar!2seg" width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            title="خريطة الموقع"
                        ></iframe>
                    </div>
                </div>
            </section>
            {/* الفوتر */}
            <footer id="footer" className="footer">
                <p>© 2024 جمعية فضاء. جميع الحقوق محفوظة.</p>
            </footer>
        </div>
    );
};

export default Home;