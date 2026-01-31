import express from 'express';
const router = express.Router();
import { createTestCases, findTestCases } from '../controllers/TestCaseController.js';
import {authenticate} from '../middlewares/authenticate.js';

router.post('/create',authenticate,createTestCases);
router.get('/get/:problemId', findTestCases);

export default router;