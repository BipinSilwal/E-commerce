import jwt from 'jsonwebtoken';
import User from '../backend/model/userModel.js';
import { UnauthorizedError } from '../errors/unauthorized-error.js';

export const isAuthenticatedUser = async (req, res, next) => {
  // cookie-parser helps to get cookie with token
  const { token } = req.cookies;

  // error if no token
  if (!token) {
    throw new UnauthorizedError('please Login to access the page!!');
  }

  // jwt verify the token which is divided into three section id, secret, expiry date.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req object create user object through we add jwt verified token id in it.
    req.user = await User.findById(decoded.userId);
    console.log(req.user._id);
  } catch (error) {
    throw new UnauthorizedError('Authentication Invalid!!');
  }

  next();
};
// getting roles from router.
export const isAuthorized = (...roles) => {
  // roles is an array..
  // check roles is true or false.
  return (req, res, next) => {
    // roles doesn't match it become true and throw error..
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        `Role ${req.user.role} is not allowed to access this resource..`
      );
    }
    // if its okay. we send to other middleware..
    next();
  };
};
