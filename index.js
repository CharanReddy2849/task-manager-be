const express = require("express");
require('dotenv').config();
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5000;

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./auth/route"));
app.use("/api/task", require("./task/task.route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
