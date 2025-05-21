const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new Error(" Please Enter the Name");
  } else if (name.length < 4 || name.length > 50) {
    throw new Error(" First Name should be 4-50 Characters");
  } else if (!validator.isEmail(email)) {
    throw new Error(" Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" Please enter a Strong Password");
  }
};

module.exports = {
  validateSignUpData,
};
