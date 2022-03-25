import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../errors/bad-request.js';
import { NotFoundError } from '../../errors/not-found.js';
import User from '../model/userModel.js';

export const signUp = async (req, res) => {
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
      public_id:
        'avatars/profile-portrait-extremely-happy-african-man-with-dreadlocks-looking-picture-id1278744283_piaozp.jpg',
      url: 'https://res.cloudinary.com/dzj7yvpje/image/upload/v1633770167/avatars/profile-portrait-extremely-happy-african-man-with-dreadlocks-looking-picture-id1278744283_piaozp.jpg',
    },
  });

  const token = user.getJwtToken();

  res.status(StatusCodes.CREATED).json({
    success: true,
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all the value');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new NotFoundError('Invalid Email or Password!!');
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new NotFoundError('Invalid Email or Password');
  }

  const token = user.getJwtToken();

  res.status(StatusCodes.OK).json({
    success: true,
    user,
    token,
  });
};
