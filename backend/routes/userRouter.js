import express from 'express';
import { login, signUp } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);

export default userRouter;
