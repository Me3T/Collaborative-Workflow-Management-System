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
    required: true,
    maxLength: 600,
  },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["To-Do", "In-Progress", "Done"],
    default: "To-Do",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Task", taskSchema);
