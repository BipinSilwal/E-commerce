import express from 'express';
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/password/forgot').post(forgotPassword);
userRouter.route('/reset/:token').put(resetPassword);
userRouter.route('/logout').get(logout);

export default userRouter;
