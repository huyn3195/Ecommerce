import User from "../models/userModels.js"; // Import the User model
import connectDB from "../config/db.js"; // Import the DB connection

// Sample users to seed
const users = [
  {
    username: "demo user", // Changed from `name` to `username`
    email: "demo@gmail.com",
    password: "$2a$10$GH8p5cAsGFEdYsLaSfTQ3e1eUs7KbLmVBltjbX4DDCj2eyO2KW/Ze", // Pre-hashed password
    isAdmin: false,
  },
  {
    username: "rishibakshi", // Changed from `name` to `username`
    email: "demo2@gmail.com",
    password: "$2a$10$tosjkprqtomSah0VJNyKi.TIv1JU65pl1i1IJ6wUttjYw.ENF99jG",
    isAdmin: false,
  },
];

// Function to seed users
export const seedUser = async () => {
  try {
    // Clear the existing users if you don't want duplicates
    await User.deleteMany(); // This deletes all users in the User collection

    // Insert new users into the database
    await User.insertMany(users);

    console.log("Users seeded successfully");
    process.exit();
  } catch (error) {
    console.error(`Error seeding users: ${error.message}`);
    process.exit(1);
  }
};
