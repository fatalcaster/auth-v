import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

import bcrypt from "bcrypt";
import { BadRequestError } from "../../errors/bad-request-error";
import { getUserByEmail } from "../../services/user-services";
import { AuthMethod, UserPayload } from "../../interfaces/user-payload";
import { NotAuthorizedError } from "../../errors/not-authorizer-error";
import jwtConfig from "../../config/jwt.config";
type Request = FastifyRequest<{
  Headers: { token: string };
  Params: { id: string; cb: string; prompt?: boolean };
  Body: { email: string; password: string };
}>;

const jwt_private = "rearfaef";

async function userEmailLoginController(req: Request, res: FastifyReply) {
  const { email, password } = req.body;
  const { id, cb, prompt } = req.params;
  if (!prompt) {
    try {
      const payload =
        req.headers &&
        (jwt.verify(req.headers.token, jwt_private) as UserPayload);
      if (payload.serviceId !== id) {
        throw new NotAuthorizedError();
      }
      const redirect_uri = `${cb}?token=${req.headers.token}`;
      res.redirect(200, redirect_uri);
      return;
    } catch {
      throw new NotAuthorizedError();
    }
  }

  const existing_user = await getUserByEmail(email, id); // await User.findOne({ email: email });
  if (existing_user === null) {
    throw new BadRequestError("Invalid parameters");
  }

  const passwordMatch = await bcrypt.compare(password, existing_user.password!);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid parameters");
  }
  // Log the user in
  switch (existing_user.service.authMethod) {
    case AuthMethod.jwt:
      break;
  }
  const payload = UserPayload.build(existing_user as UserPayload);

  const token = jwt.sign(payload, jwtConfig.JWT_ACCESS_PRIVATE);
  const redirect_uri = `${cb}?token=${token}`;
  res.code(200).redirect(redirect_uri);
}

export { userEmailLoginController };
