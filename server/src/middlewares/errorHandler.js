const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const errorCode = err.statusCode || 500;
  const errorMessage =
    errorCode == 500
      ? "Internal Server Error"
      : err.message || "An error occurred";

  res.status(errorCode).json({
    status: false,
    message: errorMessage,
    data: null,
  });
};

module.exports = errorHandler;
