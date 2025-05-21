const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/addUser", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req.body);

    const { name, password, email, role } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      password: passwordHash,
      email,
      role,
    });

    await user.save();
    res.send("User Added");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const passwordCheck = await user.validatePassword(password);

    if (passwordCheck) {
      const token = await user.getJWT();

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      res.cookie("token", token, {
        expires: expiryDate,
      });

      res.send("Login Successfull !!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res
      .status(400)
      .send("Error Logging In Please check credentials" + error.message);
  }
});

module.exports = authRouter;
