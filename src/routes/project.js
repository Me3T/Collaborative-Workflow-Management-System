const express = require("express");
const Project = require("../models/project");

const projectRouter = express.Router();

projectRouter.post("/addProject", async (req, res) => {
  try {
    const { name, description, startDate, dueDate } = req.body;

    const project = new Project({
      name,
      description,
      startDate,
      endDate,
    });

    await project.save();
    res.send("Project Added");
  } catch (err) {
    res.status(400).send("Error saving the project: " + err.message);
  }
});

module.exports = projectRouter;
