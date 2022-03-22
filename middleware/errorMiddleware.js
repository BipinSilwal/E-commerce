import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  res.status(defaultError.StatusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
