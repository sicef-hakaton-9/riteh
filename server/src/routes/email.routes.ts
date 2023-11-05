import express from 'express';
import { createBusinessEmailContent } from '../controllers/email.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess'
import checkIfUserIsBusiness from '../middleware/checkIfUserIsBusiness';
const router = express.Router();

router.post('/set-email', checkIfUserCanAccess, checkIfUserIsBusiness, createBusinessEmailContent);

export default router;