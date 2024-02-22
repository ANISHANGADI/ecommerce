class ErrorHandler extends Error {
  constructor(message = 'Internal Server Error', statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    // Create stack property
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
