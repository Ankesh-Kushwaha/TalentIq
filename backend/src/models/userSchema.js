// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["USER", "ADMIN","SUPER_ADMIN"],
    default: "USER"
  },

  rating: {
    type: Number,
    default:1200
  },

  solvedCount: {
    type: Number,
    default: 0
  },

  solvedEasy: {
    type: Number,
    default: 0
  },
  
  solvedMedium: {
    type: Number,
    default: 0
  },

  solvedHard: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
export default User;
