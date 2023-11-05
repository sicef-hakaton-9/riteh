import express from 'express';
import { getAllOpenChats } from '../controllers/chat.controller';
const router = express.Router();

router.get('/get-open-chats', getAllOpenChats);

export default router;