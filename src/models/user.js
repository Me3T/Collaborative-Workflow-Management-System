const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const process = require("process");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a Strong Password: " + value);
      }
    },
  },
  role: {
    type: String,
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValidated = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValidated;
};

module.exports = mongoose.model("User", userSchema);
