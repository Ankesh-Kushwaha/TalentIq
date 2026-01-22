import { createRateLimiter } from "./rateLimits.js"

//ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  ipv6Subnet:60,
  message: "Too many login attempts. Try again later."
});


export const forgotPasswordLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 3,
  ipv6Subnet:52,
  message: "Too many reset requests. Try again after 1 hour."
});


export const signupLimiter = createRateLimiter({
  windowMs: 60* 60 * 1000, // 1 hour
  limit: 10,
  ipv6Subnet:60,
  message: "Too many signup attempts. Try again later."
});


export const codeSubmissionRateLimiter = createRateLimiter({
  windowMs: 5*60*1000, // 5 request per 5 min
  limit: 5,
  ipv6Subnet:52,
  message:"too many submission. wait for some time."
});


export const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  ipv6Subnet: 60,
  message:"too many request",
});
