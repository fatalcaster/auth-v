import fastify, { FastifyInstance } from "fastify";
// import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cookie from "fastify-cookie";
// import { currentUser } from "./middlewares/current-user";
import { FastifySchemaValidationError } from "fastify/types/schema";
import { RequestValidationError } from "./errors/request-validation-error";
import { serializeValidationErrors } from "./helpers/serialize-validation-error";
import fastifySession from "fastify-session";
import "reflect-metadata";
import { serviceRouter } from "./routes/service-router";
import cors from "@fastify/cors";
import { userRouter } from "./routes/user-router";
const app: FastifyInstance = fastify({
  logger: true,
  trustProxy: true,
});
app.register(cors);

app.register(cookie);
// app.register(authRouter);
// ROUTERS
app.register(fastifySession, {
  secret: "eRh3Bku69gESS6yQ1aEv64g7p5IYk9Cr",
});
app.register(serviceRouter);
app.register(userRouter);
app.setErrorHandler(errorHandler);

// app.addHook("onRequest", currentUser);

// declare module "fastify" {
//   interface FastifyRequest {
//     user?: UserPayload;
//   }
// }

app.setSchemaErrorFormatter(
  (errors: FastifySchemaValidationError[], _dataVar: string) => {
    // console.log("CUSTOM FORMATTER\n\n\n", errors);
    const err = serializeValidationErrors(errors);
    throw new RequestValidationError(err);
  }
);

app.setErrorHandler(errorHandler);

// app.all("*", async () => {
//   throw new NotFoundError();
// });

export { app };
