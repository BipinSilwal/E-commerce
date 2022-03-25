import { StatusCodes } from 'http-status-codes';
import { customApiError } from './customApiError.js';

export class UnauthorizedError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
