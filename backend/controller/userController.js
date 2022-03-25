import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../errors/bad-request.js';
import { NotFoundError } from '../../errors/not-found.js';
import User from '../model/userModel.js';
import { sendToken } from '../utils/sendToken.js';

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
