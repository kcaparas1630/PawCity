import { Router } from "express";
import { getUsers, registerUser } from '../controller/UsersController';

const userRouter = Router();

userRouter.route('/user')
    .get(getUsers)
    .post(registerUser);

export default userRouter;
