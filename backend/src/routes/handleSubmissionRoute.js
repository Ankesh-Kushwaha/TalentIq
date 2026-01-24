import express from 'express';
const router = express.Router();
import { codeSubmission ,getASingleSubmission,getAllSubmissionOfAProblem,getAllUserSubmission,countParticularQuestionSubmissionStats } from '../controllers/handleSubmission.js';
import { authenticate } from '../middlewares/authenticate.js';
import {codeSubmissionRateLimiter,generalLimiter} from '../middlewares/apiRateLimiter.js'

//heavily rate limit this request
router.post('/', authenticate, codeSubmissionRateLimiter, codeSubmission);
router.use(authenticate, generalLimiter);
router.get('/get-single-submission', getASingleSubmission);
router.get('/get-all-submission-of-a-problem', getAllSubmissionOfAProblem);
router.get('/get-all-user-submission',getAllUserSubmission);
router.get('/count-question-stats', countParticularQuestionSubmissionStats);

export default router;