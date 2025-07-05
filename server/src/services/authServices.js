const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const registerService = async (data) => {
  const { name, email, password, type } = data;

  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

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

module.exports = {
  registerService,
  loginService,
};
