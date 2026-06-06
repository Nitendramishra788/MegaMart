const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar:{
      type:String,
      default:" ",
    },

    number:{
      type:String,
      default:" ",

    },

    role:{
      type:String,
      enum:["user" , "admin" , "seller"],
      default:"user",
    }


  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;