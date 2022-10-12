import { FastifyReply, FastifyRequest } from "fastify";
import { clearJWT } from "../helpers/jwt-helper";

async function logOutController(_req: FastifyRequest, res: FastifyReply) {
  clearJWT(res);
  res.send();
}

export { logOutController };
