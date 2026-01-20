import zod from 'zod';

export const verifyUserSignUp = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
  role: zod.enum(["USER", "ADMIN", "SUPER_ADMIN"]).optional(),
  rating: zod.number().min(1200).optional(),
  solvedCount: zod.number().optional(),
  solvedEasy: zod.number().optional(),
  solvedMedium: zod.number().optional(),
  solvedHard: zod.number().optional()
});