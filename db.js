// db.js
const Mongoose = require("mongoose");
const serverDB = process.env.DB_URL;

const connectDB = async () => {
  await Mongoose.connect(serverDB, 
//     {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
  )
  console.log("MongoDB Connected")
}
module.exports = connectDB