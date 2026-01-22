import User from '../models/userSchema.js';
import logger from '../config/logger.js'
import jwt from 'jsonwebtoken';
import { environment } from '../utils/env.js';

export const authenticate = async (req, res,next) => {
  try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const decoded = jwt.verify(token, environment.JWT_SECRET);
      req.user = decoded;
      next();
  }
  catch (err) {
    console.error("error in authentication middleware", err.message);
    return res.status(500).json({
      success: false,
      message:"internal server error",
    })
  }
}

export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };