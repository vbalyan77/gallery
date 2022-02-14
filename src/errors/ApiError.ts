export class ApiError {
  protected error: any;
  protected status: number;
  protected code: string;
  protected message: string;

  constructor(error: any, status: number, code?: string, message?: string) {
    this.error = error ? error.message || '' : '';
    this.status = status;
    this.code = code || this.getCode(status);
    this.message = message || this.getMessage(status);
  }

  private getCode = (status: number) => {
    switch (status) {
      case 400:
        return 'ERROR_BAD_REQUEST';
      case 401:
        return 'ERROR_UNAUTHORIZED';
      case 404:
        return 'ERROR_NOT_FOUND';
      case 403:
        return 'ERROR_FORBIDDEN';
      case 406:
        return 'ERROR_VALIDATION_FAILED';
      case 409:
        return 'ERROR_CONFLICT';
      case 500:
        return 'ERROR_INTERNAL_SERVER';
      default:
        return 'ERROR_NOT_DOCUMENTED';
    }
  };

  private getMessage = (status: number) => {
    switch (status) {
      case 400:
        return 'Something went wrong';
      case 401:
        return 'Unauthorized';
      case 404:
        return 'Not found';
      case 403:
        return 'Forbidden';
      case 406:
        return 'Validations failed';
      case 409:
        return 'Conflict';
      case 500:
        return 'Internal server error';
      default:
        return 'Error not documented.';
    }
  };
}
