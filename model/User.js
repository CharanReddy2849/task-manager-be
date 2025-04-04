const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  email:{
    type:String,
    unique: true,
    required:true,
  }
});

const User = Mongoose.model("user", UserSchema);

module.exports = User;
