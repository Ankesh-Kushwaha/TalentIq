import User from "../models/userSchema";
import { verifyUserSignUp } from "../utils/userVerification";
import logger from '../config/logger.js'
  
export const userSignup = async (req, res) => {
  try {
    
  }
  catch (err) {
    throw new Error("user signup failed", err.message);
    logger.error("user signup failed");
    return res.status(500).json({
      success: true,
      message:"internal server error.try after some time"
    })
  }
}