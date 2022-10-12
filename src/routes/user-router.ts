import { FastifyInstance } from "fastify";
import {
  userRoutes,
  emailLoginOpts,
  emailSignUpOpts,
} from "./route-opts/user-opts";

function userRouter(app: FastifyInstance, _options: any, done: any) {
  app.post(userRoutes.emailLogIn, emailLoginOpts);
  app.post(userRoutes.emailSignUp, emailSignUpOpts);
  // app.post(userRoutes.logOut, logOutOpts);
  // app.get(userRoutes.getMe, getMeOpts);

  done();
}

export { userRouter };
