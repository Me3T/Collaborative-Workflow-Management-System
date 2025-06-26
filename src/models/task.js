const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "Done"],
    default: "to-do",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Task", taskSchema);
