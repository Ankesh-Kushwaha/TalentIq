// models/User.js
import mongoose from "mongoose";
import { string } from "zod";

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
    required: true,
    select:false,
  },

  description: {
    type: String,
    default:""
  },

  ProfilePic: {
    type: String,
    default:"",
  },

  role: {
    type: String,
    enum: ["user", "admin","super_admin"],
    default: "user",
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
  
  isActive: {
    type: Boolean,
    default:true,
  },
  resetPasswordToken: {
    type:String
  },
  resetPasswordExpires: {
    type:Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
export default User;
