import express from 'express';
const router = express.Router();
import { promoteUser, demoteUser,userSignIn,userSignup ,resetPassword,forgotPassword,getUserProfile,getAllUser} from '../controllers/userController.js';
import { authenticate, authorize } from '../middlewares/authenticate.js';
import { signupLimiter, loginLimiter, forgotPasswordLimiter, generalLimiter } from '../middlewares/apiRateLimiter.js';


router.post('/signup',signupLimiter, userSignup);
router.post('/signin', loginLimiter, userSignIn);
router.get('/get/profile', authenticate, getUserProfile);
router.get('/get/all/profile', authenticate, getAllUser);

router.patch(
  "/super/demote-user",
  authenticate,
  authorize("super_admin"),
  demoteUser
);

router.patch(
  "/super/promote-user",
  authenticate,
  authorize("super_admin"),
  promoteUser
);

router.post("/forgot-password",forgotPasswordLimiter,forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;