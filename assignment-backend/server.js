const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const Assignment = require("./Models/Assignment");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ✅ Route: Get All Assignments
app.get("/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Route: Submit Assignment
app.post("/assignments", upload.single("attachment"), async (req, res) => {
  try {
    const {
      title,
      summary,
      timeLimit,
      totalPoints,
      minimumPassPoints,
      allowUploadFiles,
      maxFileSizeLimit,
    } = req.body;

    const newAssignment = new Assignment({
      title,
      summary,
      attachment: req.file?.filename || null,
      timeLimit,
      totalPoints,
      minimumPassPoints,
      allowUploadFiles,
      maxFileSizeLimit,
    });

    await newAssignment.save();
    res.status(201).json({ success: true, message: "Assignment saved!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3999;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
