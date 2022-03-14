import config from "./config/env.config";
import fastify, { FastifyInstance } from "fastify";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cookie from "fastify-cookie";
import { UserPayload } from "./interfaces/user-payload";
import { currentUser } from "./middlewares/current-user";
import { authRouter } from "./routes/auth-router";
import { FastifySchemaValidationError } from "fastify/types/schema";
import { RequestValidationError } from "./errors/request-validation-error";
import { serializeValidationErrors } from "./helpers/serialize-validation-error";
import "reflect-metadata";

const app: FastifyInstance = fastify({
  logger: true,
  trustProxy: true,
});

app.register(cookie);

// ROUTERS
app.register(authRouter);
// app.setErrorHandler()

app.addHook("onRequest", currentUser);

declare module "fastify" {
  interface FastifyRequest {
    user?: UserPayload;
  }
}

app.setSchemaErrorFormatter(
  (errors: FastifySchemaValidationError[], _dataVar: string) => {
    // console.log("CUSTOM FORMATTER\n\n\n", errors);
    const err = serializeValidationErrors(errors);
    throw new RequestValidationError(err);
  }
);

app.setErrorHandler(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
