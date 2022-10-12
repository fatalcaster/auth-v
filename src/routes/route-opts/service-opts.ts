// import { emailLoginController } from "../../controllers/email-login-controller";
import { getMeController } from "../../controllers/get-me-controller";
import { logOutController } from "../../controllers/log-out-controller";
import { serviceEmailLoginController } from "../../controllers/service-contollers/service-email-login-controller";
import { serviceEmailSignupController } from "../../controllers/service-contollers/service-email-signup-controller";
import { emailLogInSchema } from "../schemas/service/email-login-schema";
import { emailSignUpSchema } from "../schemas/service/email-signup-schema";

const serviceRoutes = {
  logOut: "/api/private/auth/logout",
  emailSignUp: "/api/private/auth/signup",
  emailLogIn: "/api/private/auth/login",
  getMe: "/api/private/auth/me",
};

const logOutOpts = {
  handler: logOutController,
};
const serviceEmailSignUpOpts = {
  schema: emailSignUpSchema,
  handler: serviceEmailSignupController,
};

const serviceEmailLoginOpts = {
  schema: emailLogInSchema,
  handler: serviceEmailLoginController,
};

const getMeOpts = {
  handler: getMeController,
};

export {
  serviceRoutes,
  logOutOpts,
  serviceEmailSignUpOpts,
  serviceEmailLoginOpts,
  getMeOpts,
};
