const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const registerService = async (data) => {
  const { name, email, password, type } = data.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, type });
  return { newUser: user };

};


const loginService = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }

  const token = generateToken(user);

  const userWithoutPassword = {
    id: user._id,
    name: user.name,
    type: user.type,
  };

  return { user: userWithoutPassword, token };
};

