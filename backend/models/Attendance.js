const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    students: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, 
        name: String,
        status: String 
    }]
});


const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;

