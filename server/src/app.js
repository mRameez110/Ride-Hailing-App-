require("dotenv").config();
const express = require("express");
const { default: helmet } = require("helmet");
const cors = require("cors");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.all("*", (req, res) => {
  throw new RouteNotFoundError();
});

app.listen(PORT, () => console.log("Server started on PORT ", PORT));
