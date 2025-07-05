const User = require("../models/User");


const registerService = async (req) => {
  const { name, email, password, type } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, type });

  return { newUser: user };
};
