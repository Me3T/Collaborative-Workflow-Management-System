const jwt = require("jsonwebtoken");
const process = require("process");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodeObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodeObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

module.exports = { userAuth, isAdmin };
// This code defines a middleware function for user authentication in an Express.js application.
// It verifies the JWT token from cookies, retrieves the user from the database, and checks if the user has admin privileges.
// If the user is not authenticated or does not have admin privileges, an error response is sent.
// If the user is authenticated and has admin privileges, the request proceeds to the next middleware or route handler.
