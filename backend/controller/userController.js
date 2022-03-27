import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/not-found.js';
import User from '../model/userModel.js';
import { sendToken } from '../utils/sendToken.js';

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(StatusCodes.OK).json({
    success: 'true',
    user,
  });
};

export const updateUserPassword = async (req, res) => {
  // from user we need to get newPassword, and oldpassword
  const { newPassword, oldPassword } = req.body;

  // firstly we look user in the database who is logged in.. get client information..
  const user = await User.findById(req.user._id).select('+password');

  // now check old password with database password.
  const isMatched = user.comparePassword(oldPassword);

  // if doesn't match throw error.
  if (!isMatched) {
    throw new NotFoundError('Invalid Email or Password');
  }

  // if matched now we add new password to the database..
  user.password = newPassword;

  await user.save();

  sendToken(user, StatusCodes.OK, res);
};

export const updateUserProfile = async (req, res) => {
  // from user we need to get userName  and email

  const newUserData = {
    userName: req.body.userName,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'user profile updated Successfully!!',
  });
};
