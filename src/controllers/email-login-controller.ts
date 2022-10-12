// import { FastifyReply, FastifyRequest } from "fastify";

// import { requestValidator } from "../helpers/request-validation-helper";
// import { emailValidator, passwordValidator } from "../helpers/cred-helper";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { NotFoundError } from "../errors/not-found-error";
// import bcrypt from "bcrypt";
// import { NotAuthorizedError } from "../errors/not-authorizer-error";
// import { BadRequestError } from "../errors/bad-request-error";
// // import { createUser } from "../../services/product-services";

// type Request = FastifyRequest<{
//   Body: { email: string; password: string; captcha?: any };
// }>;

// async function emailLoginController(req: Request, res: FastifyReply) {
//   if (!req.body) {
//     throw new BadRequestError("Body can't be empty");
//   }
//   const { email, password } = req.body;
//   console.log("PASSWORD", password);
//   const errors = requestValidator([
//     emailValidator(email),
//     passwordValidator(password),
//   ]);

//   if (errors) {
//     throw new RequestValidationError(errors);
//   }

//   // const user = await User.findOne({ email: email });
//   const user = { password: "" };
//   if (!user) {
//     throw new NotFoundError();
//   }

//   const pass_match = bcrypt.compareSync(password, user.password);
//   if (!pass_match) {
//     throw new NotAuthorizedError();
//   }

//   res.send();
// }

// export { emailLoginController };
