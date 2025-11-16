import express from 'express';
import { loginAdmin, verifyToken } from '../controllers/authController.js';

const router = express.Router();

//admin login
router.post('/login', loginAdmin);

//verify token
router.post("/verify-token", verifyToken);

export default router;