const express = require("express");
require('dotenv').config();
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 5000;

connectDB();

app.use(cors({
  origin: 'https://task-manager-fe-rho.vercel.app',
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./auth/route"));
app.use("/api/task", require("./task/task.route"));
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Task Manager API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background: #fff;
            padding: 30px 40px;
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Task Manager API</h1>
          <p>Welcome! Use the API endpoints to manage your tasks.</p>
        </div>
      </body>
    </html>
  `);
});


const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
