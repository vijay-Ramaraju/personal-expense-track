const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { body, validationResult } = require("express-validator");

// Register a new user
const registerUser = async (req, res) => {
  await body("username")
    .notEmpty()
    .withMessage("Username is required")
    .run(req);
  await body("email").isEmail().withMessage("Valid email is required").run(req);
  await body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ username, email, password });

  try {
    await user.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  await body("email").isEmail().withMessage("Valid email is required").run(req);
  await body("password")
    .notEmpty()
    .withMessage("Password is required")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { registerUser, loginUser };
