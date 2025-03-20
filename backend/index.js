const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const EmployeeModel = require('./models/Employee')
const Post = require('./models/Post');

// Middleware
app.use(cors());
app.use(express.json());

const attendanceRoutes = require("./routes/attendance");
app.use("/api/attendance", attendanceRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post("/api/attendance", async (req, res) => {
    const { date, house, students } = req.body;

    try {
        const existingAttendance = await Attendance.findOne({ house, date });

        if (existingAttendance) {
            students.forEach((newStudent) => {
                const existingStudent = existingAttendance.students.find(
                    (student) => student.name === newStudent.name
                );
                if (existingStudent) {
                    existingStudent.status = newStudent.status; 
                } else {
                    existingAttendance.students.push(newStudent); 
                }
            });

            await existingAttendance.save();
            return res.status(200).json({ message: "تم تحديث الغياب بنجاح." });
        }

        const newAttendance = new Attendance({
            date,
            house,
            students,
        });

        await newAttendance.save();
        res.status(201).json({ message: "تم تسجيل الغياب بنجاح." });
    } catch (error) {
        console.error("Error while adding attendance:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء تسجيل الغياب." });
    }
});


// GET API to fetch all attendance records
app.get("/api/attendance", async (req, res) => {
    const { house, date } = req.query;
    if (!house) {
        return res.status(400).json({ message: "اسم البيت غير موجود" });
    }

    if (!date) {
        return res.status(400).json({ message: "التاريخ غير موجود" });
    }

    const record = await Attendance.findOne({ house, date });
    if (record) {
        return res.json({ exists: true });
    }
    res.json({ exists: false });
});

  
app.get("/api/attendance/history", async (req, res) => {
    const { house } = req.query;
    try {
        const attendanceHistory = await AttendanceModel.find({ house }).sort({ date: -1 });
        const formattedHistory = attendanceHistory.map(record => ({
            date: record.date,
            attendedCount: record.students.filter(student => student.status === 'present').length,
            absentCount: record.students.filter(student => student.status === 'absent').length,
        }));
        res.json(formattedHistory);
    } catch (error) {
        res.status(500).json({ error: "خطأ في جلب السجل" });
    }
});

app.get("/api/students", async (req, res) => {
    const { house } = req.query;

    try {
        const attendanceRecords = await Attendance.find({ house });

        const studentNames = [];
        attendanceRecords.forEach(record => {
            record.students.forEach(student => {
                if (!studentNames.includes(student.name)) {
                    studentNames.push(student.name);
                }
            });
        });

        res.json(studentNames);
    } catch (error) {
        console.error("Error while fetching student names:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء جلب أسماء الطلاب." });
    }
});

//==================================================================

// POST
// إنشاء بوست جديد
app.post("/api/posts", async (req, res) => {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة." });
    }

    try {
        const newPost = new Post({ title, description, content });
        await newPost.save();
        res.status(201).json({ message: "تم إنشاء البوست بنجاح." });
    } catch (error) {
        console.error("خطأ أثناء إنشاء البوست:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء إنشاء البوست." });
    }
});

// جلب كل البوستات
app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error("خطأ أثناء جلب البوستات:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء جلب البوستات." });
    }
});

// جلب بوست واحد حسب الـ ID
app.get("/api/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "البوست غير موجود." });
        }
        res.json(post);
    } catch (error) {
        console.error("خطأ أثناء جلب البوست:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء جلب البوست." });
    }
});
// تعديل بوست
app.put("/api/posts/:id", async (req, res) => {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة." });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description, content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "البوست غير موجود." });
        }
        res.status(200).json({ message: "تم تعديل البوست بنجاح.", updatedPost });
    } catch (error) {
        console.error("خطأ أثناء تعديل البوست:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء تعديل البوست." });
    }
});

// حذف بوست
app.delete("/api/posts/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: "البوست غير موجود." });
        }
        res.status(200).json({ message: "تم حذف البوست بنجاح." });
    } catch (error) {
        console.error("خطأ أثناء حذف البوست:", error.message);
        res.status(500).json({ message: "حدث خطأ أثناء حذف البوست." });
    }
});


//=========================================================================================


// Define AdminPassword Schema and Model
const AdminPasswordSchema = new mongoose.Schema({
    password: String,
});

const AdminPassword = mongoose.model("adminpassword", AdminPasswordSchema);

const initializeAdminPassword = async () => {
    const adminPassword = await AdminPassword.findOne();
    if (!adminPassword) {
        // Encrypt and save initial password if not found
        const hashedPassword = await bcrypt.hash("1234", 10); // Default password "1234"
        const newAdminPassword = new AdminPassword({ password: hashedPassword });
        await newAdminPassword.save();
    }
};

// Initialize the password when server starts
initializeAdminPassword();


// Check Password API
app.post("/api/check-password", async (req, res) => {
    const { password } = req.body;
    const adminPassword = await AdminPassword.findOne();

    if (!adminPassword) {
        return res.status(404).send({ message: "المستخدم غير موجود" });
    }

    const isMatch = await bcrypt.compare(password, adminPassword.password);
    if (isMatch) {
        res.send({ message: "كلمة السر صحيحة" });
    } else {
        res.status(400).send({ message: "كلمة السر غير صحيحة" });
    }
});

// Change Password API
//2003
app.post("/api/change-password", async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const adminPassword = await AdminPassword.findOne();

    if (!adminPassword) {
        return res.status(404).send({ message: "المستخدم غير موجود" });
    }

    const isMatch = await bcrypt.compare(oldPassword, adminPassword.password);
    if (isMatch) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        adminPassword.password = hashedNewPassword;
        await adminPassword.save();
        res.send({ message: "تم تغيير كلمة السر بنجاح" });
    } else {
        res.status(400).send({ message: "كلمة السر القديمة غير صحيحة" });
    }
});



// mongoose.connect("mongodb+srv://hmnm5485:442004@amr.pl1ea.mongodb.net/?retryWrites=true&w=majority&appName=amr");
//STUEDENTS

app.post('/login', (req, res) => {
    const { name, password } = req.body;

    EmployeeModel.findOne({ name: name })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // تحديد نوع المستخدم بناءً على role

                    res.json({ message: "Success", redirectUrl: "/student-dashboard" }); // صفحة الطالب

                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record found");

            }
        })
        .catch(err => {
            res.status(500).json("An error occurred");
            console.log(err);
        });
});

app.post('/register', async (req, res) => {
    try {
        const { name, password, faculty, phone, city, year, team } = req.body;

        const newEmployee = new EmployeeModel({
            name,
            password,
            faculty,
            phone,
            city,
            year,
            team
        });

        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register user" });
    }
});

//dashord

app.get('/students/stats', async (req, res) => {
    try {
        const totalStudents = await EmployeeModel.countDocuments(); // عدد الطلاب الكلي

        const studentsByYear = await EmployeeModel.aggregate([
            { $group: { _id: "$year", count: { $sum: 1 } } }
        ]);

        const mostPopulatedFaculty = await EmployeeModel.aggregate([
            { $group: { _id: "$faculty", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const mostPopulatedCity = await EmployeeModel.aggregate([
            { $group: { _id: "$city", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);



        res.json({
            totalStudents,
            studentsByYear,
            mostPopulatedFaculty: mostPopulatedFaculty.length > 0 ? mostPopulatedFaculty[0] : null,
            mostPopulatedCity: mostPopulatedCity.length > 0 ? mostPopulatedCity[0] : null,

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch student statistics" });
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await EmployeeModel.find({}, { password: 0 }); // إخفاء الباسورد
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// DELETE
app.delete('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await EmployeeModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete student" });
    }
});

// EDITE

app.put('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedStudent = await EmployeeModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(updatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update student" });
    }
});








app.listen(5000, () => {
    console.log("elserver tammam");

})

// MongoDB connection
mongoose.connect("mongodb+srv://hmnm5485:442004@amr.pl1ea.mongodb.net/?retryWrites=true&w=majority&appName=amr")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
