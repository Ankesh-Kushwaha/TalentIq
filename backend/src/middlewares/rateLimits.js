import {rateLimit} from "express-rate-limit";

export const createRateLimiter = ({
  windowMs,
  limit,
  ipv6Subnet,
  message = "Too many requests, please try again later"
}) => {
  return rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,  
    ipv6Subnet,
    message: {
      success: false,
      message
    }
  });
};
