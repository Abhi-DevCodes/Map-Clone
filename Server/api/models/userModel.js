import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "provide a username"],
  },
  email: {
    type: String,
    require: [true, "enter an email"],
    unique: true,
    validate: [isEmail, "Enter a valid email id"],
  },
  password: {
    type: String,
    require: true,
  },
  isverified: {
    type: Boolean,
    default: false,
    require: true,
  },
  otp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
