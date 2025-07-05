
const registerUser = async (req, res, next) => {
  try {
    const { newUser } = await registerService(req.body);

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
    validation(req.body, loginValidationSchema);
    const { user, token } = await loginService(req.body);

    res.status(200).json({
      message: "Login successfully",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
