import { FastifyReply, FastifyRequest } from "fastify";
// import bcrypt from "bcrypt";
import { NotFoundError } from "../../errors/not-found-error";
import { RequestValidationError } from "../../errors/request-validation-error";
import { passwordValidator } from "../../helpers/cred-helper";
import { requestValidator } from "../../helpers/request-validation-helper";
// import { AuthMethod } from "../../interfaces/user-payload";
import jwt from "jsonwebtoken";
import { getServiceById } from "../../services/service-services";
import { createUser } from "../../services/user-services";
import { UserPayload } from "../../interfaces/user-payload";
import jwtConfig from "../../config/jwt.config";
// import  from "../../config/jwt.config";
type Request = FastifyRequest<{
  Params: { id: string };
  Querystring: { cb: string };
  Body: { email: string; password: string };
}>;

const MIN_PASSWORD_LENGTH = 8;

async function userEmailSignupController(req: Request, res: FastifyReply) {
  const { email, password } = req.body;
  const { cb } = req.query;
  const { id } = req.params;

  const service = await getServiceById(id);
  console.log(service);
  if (service === null) {
    throw new NotFoundError();
  }

  const errors = requestValidator([
    passwordValidator(
      password,
      service.passwordRequirement!,
      MIN_PASSWORD_LENGTH
    ),
  ]);

  if (errors !== null) {
    throw new RequestValidationError(errors);
  }

  const user = await createUser({
    email: email,
    service: service,
    password: password,
  });

  // Log the user in
  // switch (service.authMethod) {
  //   case AuthMethod.jwt:
  //     break;
  //   case AuthMethod.session:
  //     req.session.authenticated = true;
  //     break;
  // }
  const payload = UserPayload.build(user as UserPayload);
  // const payload: Payload = jwt.sign({});
  const redirect_uri = `${cb}?token=${jwt.sign(
    payload,
    jwtConfig.JWT_ACCESS_PRIVATE
  )}`;
  console.log(redirect_uri);
  res.redirect(redirect_uri);
}

export { userEmailSignupController };
