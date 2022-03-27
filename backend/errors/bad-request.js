import { StatusCodes } from 'http-status-codes';
import { customApiError } from './customApiError.js';

export class BadRequestError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
