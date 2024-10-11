import connectDB from "./config/db.js";
import { seedUser } from "./seed/User.js";

const runSeed = async () => {
  await connectDB(); // First, ensure the database is connected
  await seedUser(); // Then, seed the users
};

runSeed();
