import express from 'express';
import { getAllWindturbines } from '../controllers/windturbine.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess'
const router = express.Router();

router.get('/get-all-windturbines', getAllWindturbines);

export default router;