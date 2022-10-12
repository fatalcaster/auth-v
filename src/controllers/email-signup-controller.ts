// import { FastifyReply, FastifyRequest } from "fastify";
// // import bcrypt from "bcrypt";
// import { ConflictError } from "../errors/conflict-error";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { passwordValidator } from "../helpers/cred-helper";
// import { requestValidator } from "../helpers/request-validation-helper";

// type Request = FastifyRequest<{ Body: any }>;

// // const SALT_ROUNDS = 6;

// async function emailSignupController(req: Request, _res: FastifyReply) {
//   const { email, password } = req.body;

//   const errors = requestValidator([passwordValidator(password,)]);

//   if (errors) {
//     throw new RequestValidationError(errors);
//   }

//   const existing_email = email; // await User.findOne({ email: email });

//   if (existing_email) {
//     throw new ConflictError("User with the given email already exists");
//   }
//   // const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

//   // const user = User.build({ email: email, password: hashed_password });
//   // await user.save();

//   // const tokens = createTokens(user);

//   // attachJwt(tokens.access, tokens.refresh, res);

//   // res.code(201).send(user);
// }

// export { emailSignupController };
