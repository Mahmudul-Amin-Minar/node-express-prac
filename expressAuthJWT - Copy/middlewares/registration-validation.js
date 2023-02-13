const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const User = require('../models/User.js');

const RegistrationValidations = [
    check("email", "Invalid email address").isEmail().trim().custom(async (value) => {
        try {
            const user = await User.findOne({ email: value });
            if (user) {
                throw createError("Email already is use!");
            }
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check("password").isLength({min: 6}).withMessage("Password must be at least 6 character"),
]

const RegistrationValidationsHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  RegistrationValidations,
  RegistrationValidationsHandler
}

