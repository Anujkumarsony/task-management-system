const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

dotenv.config();

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: "Admin@123",
    role: "Admin",
  },
  {
    name: "Manager",
    email: "manager@example.com",
    password: "Manager@123",
    role: "Manager",
  },
  {
    name: "User",
    email: "user@example.com",
    password: "User@123",
    role: "User",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    for (let u of users) {
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({
        name: u.name,
        email: u.email,
        password: hashed,
        role: u.role,
      });
    }
    console.log("Seeded users");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();
