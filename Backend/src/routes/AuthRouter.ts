import { Router, Request, Response } from "express";
import { authenticateJWT } from '../middleware/auth';
import { registerUser, loginUser } from "../controller/AuthController";
import { uploadProfilePicture } from "../config/multer-config";
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each ip to 10 requests per window/minute
    message: 'Too many login attempts, please try again later'
});

const authRouter = Router();

authRouter.post('/auth/register', uploadProfilePicture, registerUser);
authRouter.route('/auth/login').post(loginLimiter, loginUser);

authRouter.get('/main', authenticateJWT, (req: Request, res: Response) => {
    res.json({ message: 'Access granted to protected route' });
  });

export default authRouter;
