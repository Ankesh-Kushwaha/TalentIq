import zod from 'zod';

export const verifyUserSignUp = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
  role: zod.enum(["user", "admin", "super_admin"]).optional(),
});

export const verifySignin = zod.object({
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6, "Password must be at least 6 characters")
});