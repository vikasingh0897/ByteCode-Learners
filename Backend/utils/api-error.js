class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something Went Wrong!',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
