class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message); // which invokes the constructor of the parent class
    /*
    Always call super() first in the constructor when using extends. 
    It ensures the parent class is properly initialized before working with this
    */
    this.statusCode = statusCode;
    this.message = message;
    this.resData = null;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.stack);
    }
  }
}
export { ApiError };
// stack trace error