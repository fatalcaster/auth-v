import { FastifyInstance } from "fastify";
import {
  logOutOpts,
  serviceEmailLoginOpts,
  serviceEmailSignUpOpts,
} from "./route-opts/service-opts";
import { serviceRoutes } from "./route-opts/service-opts";

function serviceRouter(app: FastifyInstance, _options: any, done: any) {
  app.post(serviceRoutes.emailLogIn, serviceEmailLoginOpts);
  app.post(serviceRoutes.emailSignUp, serviceEmailSignUpOpts);
  app.post(serviceRoutes.logOut, logOutOpts);

  done();
}

export { serviceRouter };
