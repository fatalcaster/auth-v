import { getMeController } from "../../controllers/get-me-controller";
import { logOutController } from "../../controllers/log-out-controller";
import { userEmailLoginController } from "../../controllers/user-controllers/user-email-login-controller";
import { userEmailSignupController } from "../../controllers/user-controllers/user-email-signup-controller";
import { emailLogInSchema } from "../schemas/service/email-login-schema";
import { emailSignUpSchema } from "../schemas/service/email-signup-schema";

const userRoutes = {
  logOut: "/api/auth/logout/:id",
  emailSignUp: "/api/auth/signup/:id",
  emailLogIn: "/api/auth/login/:id",
  getMe: "/api/auth/me/:id",
};

const logOutOpts = {
  handler: logOutController,
};
const emailSignUpOpts = {
  schema: emailSignUpSchema,
  handler: userEmailSignupController,
};

const emailLoginOpts = {
  schema: emailLogInSchema,
  handler: userEmailLoginController,
};

const getMeOpts = {
  handler: getMeController,
};

export { userRoutes, logOutOpts, emailSignUpOpts, emailLoginOpts, getMeOpts };
