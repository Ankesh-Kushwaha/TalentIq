import express from 'express';
const router = express.Router();
import { createProblem, getAllProblem, getASingleProblem, gobalSearchTheProblem } from '../controllers/problemsController.js';
import { authenticate } from '../middlewares/authenticate.js';

router.post('/create',authenticate, createProblem);
router.get('/get/:problemId', getASingleProblem);
router.get('/get-all', getAllProblem);
router.get('/search',gobalSearchTheProblem);

export default router;