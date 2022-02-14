import { ApiError } from './ApiError';

export class AuthorizationError extends ApiError {
  constructor(error: any, status: number, code?: string, message?: string) {
    super(error, status, code, message);
    this.error = 'Forbidden';
  }
}
