import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/not-found.js';
import User from '../model/userModel.js';
import { sendToken } from '../utils/sendToken.js';

// Which user or client can have access...............................
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

  // if userId matches then we can update our userProfile
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'user profile updated Successfully!!',
  });
};

// ....................................................allUsers.........................................................

// Only admin can have access to this page....
export const getAllUsers = async (req, res) => {
  // admin can access total User.
  const totalUser = await User.countDocuments();

  // finding all the documents.
  const user = await User.find();

  res.status(StatusCodes.OK).json({
    success: true,
    user,
    totalUser,
  });
};

// .................................................... each user details.................................................................

export const getUserDetails = async (req, res) => {
  // when admin looks for each user.
  const user = await User.findById(req.params.id);

  // throw error if not found...
  if (!user) {
    throw new NotFoundError('no such user found!!');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

// .................................................... update user .................................................................

export const updateUsers = async (req, res) => {
  // from user we need to get userName  and email

  const newUserData = {
    userName: req.body.userName,
    email: req.body.email,
    role: req.body.role,
  };

  // get each user Id and update what is need to be updated..
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'user profile updated Successfully!!',
  });
};

export const deleteUsers = async (req, res) => {
  // get each user Id and update what is need to be updated..

  const user = await User.findById(req.params.id);

  // remove the document..
  await user.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: ' deleted user Successfully!!',
  });
};
