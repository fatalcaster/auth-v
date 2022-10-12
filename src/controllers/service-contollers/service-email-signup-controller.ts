import { FastifyReply, FastifyRequest } from "fastify";
// import bcrypt from "bcrypt";
import { ConflictError } from "../../errors/conflict-error";
import { RequestValidationError } from "../../errors/request-validation-error";
import {
  PasswordRequirement,
  passwordValidator,
} from "../../helpers/cred-helper";
import { requestValidator } from "../../helpers/request-validation-helper";
import {
  createService,
  getServiceByEmail,
} from "../../services/service-services";
type Request = FastifyRequest<{ Body: { email: string; password: string } }>;

const MIN_PASSWORD_LENGTH = 8;

async function serviceEmailSignupController(req: Request, res: FastifyReply) {
  const { email, password } = req.body;

  const errors = requestValidator([
    passwordValidator(
      password,
      PasswordRequirement.includeUppercase,
      MIN_PASSWORD_LENGTH
    ),
  ]);

  if (errors) {
    throw new RequestValidationError(errors);
  }

  const existing_email = await getServiceByEmail(email); // await User.findOne({ email: email });
  if (existing_email !== null) {
    throw new ConflictError("User with the given email already exists");
  }

  const service = await createService({
    email: email,
    password: password,
  });
  // Log the user in
  req.session.authenticated = true;

  res.code(201).send(service);
}

export { serviceEmailSignupController };
