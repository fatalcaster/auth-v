import { FastifyReply, FastifyRequest } from "fastify";
// import bcrypt from "bcrypt";

import { getServiceByEmail } from "../../services/service-services";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../errors/bad-request-error";
type Request = FastifyRequest<{ Body: { email: string; password: string } }>;

async function serviceEmailLoginController(req: Request, res: FastifyReply) {
  const { email, password } = req.body;

  if (req.session.authenticated === true) {
    res.code(200).send();
    return;
  }

  const existing_user = await getServiceByEmail(email); // await User.findOne({ email: email });
  if (existing_user === null) {
    throw new BadRequestError("Invalid parameters");
  }

  const passwordMatch = await bcrypt.compare(password, existing_user.password!);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid parameters");
  }
  // Log the user in

  req.session.authenticated = true;

  res.code(200).send();
}

export { serviceEmailLoginController };
