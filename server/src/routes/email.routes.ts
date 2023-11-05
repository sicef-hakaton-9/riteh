import express from 'express';
import { getAllContainers } from '../controllers/container.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess'
import checkIfUserIsBusiness from '../middleware/checkIfUserIsBusiness';
const router = express.Router();

router.post('/set-email', checkIfUserCanAccess, checkIfUserIsBusiness, getAllContainers);

export default router;