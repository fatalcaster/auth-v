import { FastifyReply, FastifyRequest } from "fastify";
import mongoose from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

type Request = FastifyRequest<{ Params: { id: string } }>;

export const requiresValidId = (
  req: Request,
  _res: FastifyReply,
  next: any
) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new NotFoundError();
  next();
};
