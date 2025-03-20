const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: String,
    password: String,
    faculty: String,
    phone: String,
    city: String,
    year: String,
    team: String,
    role: { type: String, default: "student" } // الدور الافتراضي طالب
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;
