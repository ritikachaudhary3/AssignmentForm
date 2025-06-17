const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  summary: String,
  attachment: String, // File path or filename
  timeLimit: String,
  totalPoints: Number,
  minimumPassPoints: Number,
  allowUploadFiles: Number,
  maxFileSizeLimit: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Assignment", assignmentSchema);
