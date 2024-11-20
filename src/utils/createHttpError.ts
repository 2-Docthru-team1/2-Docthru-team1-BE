import { HttpError } from '#types/http-error.types.js';

class CustomHttpError extends HttpError {
  name: string;
  constructor(message: string, status: number, name: string) {
    super(message, status);
    this.status = status;
    this.name = name;

    Object.setPrototypeOf(this, CustomHttpError.prototype);
  }
}

export function createHttpError(message: string, status: number, name: string) {
  return new CustomHttpError(message, status, name);
}
