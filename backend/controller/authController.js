import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/bad-request.js';
import { NotFoundError } from '../errors/not-found.js';
import User from '../model/userModel.js';
import { sendEmail } from '../utils/sendEmail.js';
import { sendToken } from '../utils/sendToken.js';
import crypto from 'crypto';
import cloudinary from 'cloudinary';

export const signUp = async (req, res) => {
  // incase of cloudinary we get avatar from the client ..

  //result is an object
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });

  // we get input from the client.
  const { userName, email, password } = req.body;

  // no input and submitted, sending error.
  if (!userName || !email || !password) {
    throw new BadRequestError('Please provide all the values');
  }

  // if email is already in the database..
  const userAlreadyExists = await User.findOne({ email });

  // error throwing with
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.create({
    userName,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  // sending token to user...
  sendToken(user, StatusCodes.CREATED, res);
};

//.............................................Login...........................

export const login = async (req, res) => {
  // get input from client
  const { email, password } = req.body;

  // no input throw error.
  if (!email || !password) {
    throw new BadRequestError('Please provide all the value');
  }

  // now check email and password in the database.
  // select is false for password so we need to select password as well..
  const user = await User.findOne({ email }).select('+password');

  // email or password is wrong..
  if (!user) {
    throw new NotFoundError('Invalid Email or Password!!');
  }

  // now if comparing client password with database password
  const isPasswordMatched = await user.comparePassword(password);

  // throw error if not matched.
  if (!isPasswordMatched) {
    throw new NotFoundError('Invalid Email or Password');
  }
  // if password is correct, send token.
  sendToken(user, StatusCodes.OK, res);
};

//.................................................Forgot password ..............................

export const forgotPassword = async (req, res) => {
  // get email from user...
  const { email } = req.body;

  // check whether there is user document with such email
  const user = await User.findOne({ email });

  // if not throw error..
  if (!user) {
    throw new BadRequestError('No such Email!!');
  }

  // now we generate token in the database..

  const resetToken = user.getResetPasswordToken();

  // with generating token we set resetPassword and  resetExpires time.
  await user.save({ validateBeforeSave: false });

  //  creating resetUrl to be sent in the mail
  // http://localhost:4000/api/v1/reset/:token
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/reset/${resetToken}`;

  // this message will send in email body...
  const message = `Your password reset token is as follows: \n\n ${resetUrl}\n\n If you have not request this email, then ignore it.. `;

  // we send mail through package called nodemailer.
  try {
    await sendEmail({
      email: user.email,
      subject: `ShopIT Password Recovery!!`,
      message,
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    throw new Error(error.message);
  }
};

// ..........................................resetPassword ..................

export const resetPassword = async (req, res) => {
  // we get token from url which we compare with token in the database..
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // we find the token with greater expiry time.
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // no such token or token already expired we send error message.
  if (!user) {
    throw new BadRequestError(
      'Password reset token is invalid or has been expired..'
    );
  }

  // client password
  if (req.body.password !== req.body.confirmPassword) {
    throw new BadRequestError(' Password does not match');
  }

  // password in database becomes what user sent as password
  user.password = req.body.password;

  // only need when need to send token in email so other time they are undefined..
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // we save our database.
  await user.save();

  // again token are sent in cookies..
  sendToken(user, StatusCodes.OK, res);
};

// ...................................................Logout..........................

export const logout = async (req, res) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };

  res.status(StatusCodes.OK).cookie('token', null, options).json({
    success: true,
    message: 'Logged Out!!!',
  });
};
