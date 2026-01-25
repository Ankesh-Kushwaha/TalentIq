import express from 'express';
const router = express.Router();
import { addlanguageContainer, updateLanguageContainer, deleteLanguageContainer, getALanguageInfoContainer, getAllLanguageInfoContainer } from "../controllers/LanguageController.js";
import { authenticate } from '../middlewares/authenticate.js';

router.use(authenticate);
router.post("/create/container", addlanguageContainer);
router.put('/update/container', updateLanguageContainer);
router.delete('/delete/container', deleteLanguageContainer);
router.get('/get/container', getALanguageInfoContainer);
router.get('/get/containers', getAllLanguageInfoContainer);

export default router;