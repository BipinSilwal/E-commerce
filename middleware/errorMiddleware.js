import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(defaultError.StatusCode).json({
      success: 'false',
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    if (err.name === 'CastError') {
      defaultError.StatusCode = StatusCodes.BAD_REQUEST;
      defaultError.msg = `Resource not found. Invalid: ${err.path}`;
    }
    if (err.name === 'ValidationError') {
      defaultError.StatusCode = StatusCodes.BAD_REQUEST;
      defaultError.msg = Object.values(err.errors)
        .map((value) => value.message)
        .join(',');
    }

    res
      .status(defaultError.StatusCode)
      .json({ success: 'false', msg: defaultError.msg });
  }
};

export default errorHandlerMiddleware;
