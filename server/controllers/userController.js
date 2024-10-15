import bcrypt from "bcrypt";
import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
    return;
  }

  // Hash the password
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Save the user to the database
    await newUser.save();

    // Generate a token for the user
    generateToken(res, newUser._id);

    // Respond with the created user data (excluding password)
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Error creating user. Please try again.");
  }
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const existingUser = await User.findOne({ email });

  // If user exists
  if (existingUser) {
    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is valid
    if (isPasswordValid) {
      // Generate a token for the user
      const token = generateToken(res, existingUser._id);

      // Respond with user data (excluding password)
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        token,
      });
      return;
    } else {
      res.status(401).send("Invalid credentials"); // Incorrect password
    }
  } else {
    res.status(404).send("User not found"); // No user with that email
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404).send("User not found");
  }
});
export const findUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
});
export const updatedUseById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).send("User not found");
  }
});
