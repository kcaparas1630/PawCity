import { Router } from "express";
import { registerUser, loginUser } from "../controller/AuthController";

const authRouter = Router();

authRouter.route('/auth/register').post(registerUser);
authRouter.route('/auth/login').post(loginUser);

export default authRouter;
