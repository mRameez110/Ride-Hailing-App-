require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/dbConnection");
const authRoutes = require("./routes/authRoutes");
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Server started on PORT ", PORT));
