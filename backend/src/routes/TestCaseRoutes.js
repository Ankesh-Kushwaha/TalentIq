import express from 'express';
const router = express.Router();
import { createTestCases, findTestCases } from '../controllers/TestCaseController.js';

router.post('/create', createTestCases);
router.get('/get/:problemId', findTestCases);

export default router;