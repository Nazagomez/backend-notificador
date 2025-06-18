import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/reset-password', authController.resetPassword);

export default authRouter;
