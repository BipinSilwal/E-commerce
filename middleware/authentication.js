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

    // req object has access to the user object through we add jwt verified token id in it.
    req.user = { userId: decoded.userId };
  } catch (error) {
    throw new UnauthorizedError('Authentication Invalid!!');
  }

  next();
};
