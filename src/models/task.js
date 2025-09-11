const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  description: {
    type: String,
    required: false,
    maxLength: 1800,
  },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "high",
  },
  status: {
    type: String,
    enum: ["To-Do", "In-Progress", "Done"],
    default: "Done",
  },
  dueDate: {
    type: Date,
    required: false,
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Task", taskSchema);
