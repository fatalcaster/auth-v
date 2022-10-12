import { ValidationErrorTemplate } from "../interfaces/validation-error-template";

export const requestValidator = (
  validations: Array<ValidationErrorTemplate[]>
) => {
  let err: ValidationErrorTemplate[] = [];
  for (let i = 0; i < validations.length; i++) {
    err = err.concat(validations[i]);
    if (err.length) {
      return err;
    }
  }
  return null;
};
