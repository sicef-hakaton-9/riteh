import express from 'express';
import { getAllContainers } from '../controllers/container.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess'
const router = express.Router();

router.get('/get-all-containers', checkIfUserCanAccess, getAllContainers);

export default router;