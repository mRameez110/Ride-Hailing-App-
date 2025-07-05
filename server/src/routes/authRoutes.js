const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("User registered successfully");
});

router.post("/register", (req, res) => {
  res.send("User registered successfully");
});

router.post("/login", (req, res) => {
  res.send("User logged in successfully");
});

module.exports = router;
