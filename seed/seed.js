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
import { MONGODB_URI } from '../config/connection.js';
import mongoose from 'mongoose';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async function () {
  console.log('Connected to MongoDB');

  try {
    await User.create({ username: 'banana', password: 'meatloaf' });
    console.log('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
  }

  try {
    await mongoose.connection.close(); 
    console.log('Connection to MongoDB closed');
  } catch (err) {
    console.error('Error closing the connection:', err);
  }
});
