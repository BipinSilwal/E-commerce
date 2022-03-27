import express from 'express';
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
} from '../controller/authController.js';
import {
  getAllUsers,
  getUserDetails,
  getUserProfile,
  updateUsers,
  deleteUsers,
  updateUserPassword,
  updateUserProfile,
} from '../controller/userController.js';
import {
  isAuthenticatedUser,
  isAuthorized,
} from '../middleware/authentication.js';

const userRouter = express.Router();

// all about authentication and authorization
userRouter.route('/signup').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/password/forgot').post(forgotPassword);
userRouter.route('/reset/:token').put(resetPassword);
userRouter.route('/logout').get(logout);

// all about user profile, update, delete..
userRouter.route('/me').get(isAuthenticatedUser, getUserProfile);
userRouter
  .route('/password/update')
  .put(isAuthenticatedUser, updateUserPassword);
userRouter.route('/profile/update').put(isAuthenticatedUser, updateUserProfile);
userRouter
  .route('/admin/alluser')
  .get(isAuthenticatedUser, isAuthorized('admin'), getAllUsers);
userRouter
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, isAuthorized('admin'), getUserDetails)
  .patch(isAuthenticatedUser, isAuthorized('admin'), updateUsers)
  .delete(isAuthenticatedUser, isAuthorized('admin'), deleteUsers);

export default userRouter;
