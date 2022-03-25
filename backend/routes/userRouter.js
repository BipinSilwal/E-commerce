import express from 'express';
import { login, logout, signUp } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/logout').get(logout);

export default userRouter;
