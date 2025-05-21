const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const cookieParser = require("cookie-parser");
const projectRouter = require("./routes/project");
require("dotenv").config();

const app = express();
app.use(cookieParser());

// This should be express.json() with parentheses
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", projectRouter);

// Add a route for the root path
connectDB()
  .then(() => {
    console.log("Connection Established");
    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("Connection not Established");
  });
