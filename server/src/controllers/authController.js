const {
  UserRegisterService,
  userLoginService,
} = require("../services/authServices");

const registerUser = async (req, res, next) => {
  try {
    const { newUser } = await UserRegisterService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        type: newUser.type,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // validation(req.body, loginValidationSchema);
    const { user, token } = await userLoginService(req.body);

    res.status(200).json({
      message: "Login successfully",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
