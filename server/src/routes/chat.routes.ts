import express from 'express';
import { getAllOpenChats } from '../controllers/chat.controller';
import checkIfUserIsBusiness from '../middleware/checkIfUserIsBusiness'
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess';
const router = express.Router();

router.get('/get-open-chats', checkIfUserCanAccess, checkIfUserIsBusiness, getAllOpenChats);

export default router;