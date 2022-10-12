import { FastifySchemaValidationError } from "fastify/types/schema";
import { ValidationErrorTemplate } from "../interfaces/validation-error-template";

type SchemaValdationError<T> = Partial<T> & {
  params?: {
    missingProperty?: string;
  };
};

export function serializeValidationErrors(
  validation: SchemaValdationError<FastifySchemaValidationError>[]
) {
  const err: ValidationErrorTemplate[] = [];
  for (let i = 0; i < validation.length; i++) {
    if (validation[i].instancePath) {
      let dataPath = validation[i].instancePath;
      if (dataPath![0] === ".") {
        dataPath = dataPath?.substring(1);
      }
      err.push({
        params: dataPath!,
        msg: validation[i].message || "Invalid field",
      });
    } else {
      err.push({
        params: validation[i].params?.missingProperty || "body",
        msg: validation[i].message || "Invalid field",
      });
    }
  }
  return err;
}
