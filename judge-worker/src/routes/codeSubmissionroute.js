import express from 'express';
import codeSubmission from '../controllers/handleCodeSubmission.js';
const router = express.Router();

router.post('/submission', codeSubmission);
export default router;