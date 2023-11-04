import express from 'express';
import { loginController, registerController } from '../controllers/auth.controller';
import checkIfUserCanAccess from '../middleware/checkIfUserCanAccess'
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *      - Users
 *     summary: User login route
 *     description: This route is used for user authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized. Incorrect login details.
 */
router.post('/login', loginController);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint is used for registering a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request. Either email or password is missing, or user already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', registerController);

export default router;