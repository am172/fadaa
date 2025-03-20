const express = require("express");
const Attendance = require("../models/Attendance");
const houses = require("../data/houses");

const router = express.Router();

// Get all houses
router.get("/houses", (req, res) => {
  res.json(houses);
});

// Add attendance
router.post("/", async (req, res) => {
  const { date, house, students } = req.body; // التاريخ يتم إرساله من الواجهة الأمامية

  try {
    const attendance = new Attendance({ date, house, students });
    await attendance.save();
    res.status(201).json({ message: "Attendance recorded successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to record attendance." });
  }
});

// Get all attendance records 
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance records." });
  }
});

module.exports = router;

