import { StatusCodes } from 'http-status-codes';
import { customApiError } from './customApiError.js';

export class NotFoundError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
