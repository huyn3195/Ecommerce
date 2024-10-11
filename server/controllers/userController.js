import bcrypyt from "bcrypt";
import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  try {
  } catch (err) {
    res.status(500);
    throw new Error("Invalid user data");
  }
});
