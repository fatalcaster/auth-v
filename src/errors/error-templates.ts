import { RequestValidationError } from "./request-validation-error";

function InsufficientItemsError(id?: string) {
  return new RequestValidationError([
    {
      msg: "Not enough items on hand to record this transaction",
      params: "cart",
      id: id,
    },
  ]);
}

export { InsufficientItemsError };
