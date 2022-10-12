import { FastifyReply, FastifyRequest } from "fastify";
import { CustomError } from "../errors/custom-error";

export const errorHandler = async (
  err: any,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log("Something went wrong", err);

  if (err instanceof CustomError) {
    reply.status(err.statusCode).send(err.serializeErrors());
  }

  console.error(err);

  reply.status(400).send({ errors: [{ message: "Something went wrong" }] });
};
