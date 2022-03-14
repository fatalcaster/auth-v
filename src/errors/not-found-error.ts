import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  index?: number;
  constructor(index?: number) {
    super("Route not found");
    this.index = index;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found", index: this.index }];
  }
}
