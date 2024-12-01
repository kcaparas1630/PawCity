import { Router } from "express";
import { getUsers, getCurrentUser } from '../controller/UsersController';
import { authenticateJWT } from '../middleware/auth';

const userRouter = Router();

userRouter.get('/user', authenticateJWT, getUsers);
userRouter.get('/user/me', authenticateJWT, getCurrentUser);

export default userRouter;
