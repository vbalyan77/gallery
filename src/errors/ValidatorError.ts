import { ApiError } from './ApiError';

export class ValidatorError extends ApiError {
  constructor(error: any, status: number, code?: string, message?: string) {
    super(error, status, code, message);
    this.error = error;
  }
}
