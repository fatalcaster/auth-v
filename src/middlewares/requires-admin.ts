import { FastifyReply, FastifyRequest } from "fastify";
import { NotAuthorizedError } from "../errors/not-authorizer-error";
import { Permissions } from "../interfaces/user-payload";

export const requiresAdmin = (
  req: FastifyRequest,
  _res: FastifyReply,
  next: any
) => {
  if (!req.user || req.user.permission !== Permissions.Admin) {
    throw new NotAuthorizedError();
  }
  next();
};
