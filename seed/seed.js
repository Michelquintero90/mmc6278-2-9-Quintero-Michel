if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

import User from '../models/User.js';
import mongoose from '../config/connection.js';

mongoose.once("open", async function () {
  // insert a sample user
  await User.create({ username: "banana", password: "meatloaf" });

  mongoose.close();
});
