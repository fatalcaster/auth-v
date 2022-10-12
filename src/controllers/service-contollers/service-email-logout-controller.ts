import { FastifyReply, FastifyRequest } from "fastify";
import { InternalServerError } from "../../errors/internal-server-error";

type Request = FastifyRequest<{ Body: { email: string; password: string } }>;

async function serviceLogoutController(req: Request, res: FastifyReply) {
  if (req.session.authenticated) {
    req.destroySession((err) => {
      if (err) {
        throw new InternalServerError();
      } else res.code(200).send();
    });
  }
  res.code(200).send();
}

export { serviceLogoutController };
