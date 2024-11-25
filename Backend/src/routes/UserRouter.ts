import { Router } from "express";
import getUsers from '../controller/UsersController';

const userRouter = Router();

userRouter.route('/user').get(getUsers)

export default userRouter;
