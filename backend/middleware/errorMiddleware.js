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
      msg: defaultError.msg,
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

    if (erro.code && err.code === 11000) {
      defaultError.StatusCode = StatusCodes.BAD_REQUEST;
      defaultError.msg = ` Duplicate ${Object.keys(err.keyValue)} entered `;
    }

    if (err.name === 'JsonWebTokenError') {
      defaultError.StatusCode = StatusCodes.BAD_REQUEST;
      defaultError.msg = `Json web Token is Invalid. Try Again!!! `;
    }

    if (err.name === 'TokenExpiredError') {
      defaultError.StatusCode = StatusCodes.BAD_REQUEST;
      defaultError.msg = `JSON web Token is expired. Try Again!!! `;
    }

    res
      .status(defaultError.StatusCode)
      .json({ success: 'false', msg: defaultError.msg });
  }
};

export default errorHandlerMiddleware;
