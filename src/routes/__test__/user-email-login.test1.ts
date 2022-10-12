// import { app } from "../../app";
// import { ID } from "../../helpers/ID";
// import { cutIdParamOff } from "../../helpers/string-helper";
// import { createService } from "../../services/service-services";
// import { userRoutes } from "../route-opts/user-opts";

// const testRoutes = {
//   emailSignUp: cutIdParamOff(userRoutes.emailSignUp),
//   emailLogIn: cutIdParamOff(userRoutes.emailLogIn),
// };
// const createServiceProvider = async (user?: string) => {
//   const email = `${user || "service"}@service.com`;
//   const service = await createService({ email: email });
//   expect(ID.isValid(service.id)).toEqual(true);
//   return service;
// };

// it("Returns code different than 404", async () => {
//   const service = await createServiceProvider();
//   const response = await app.inject({
//     method: "POST",
//     url: testRoutes.emailSignUp,
//     payload: {
//       email: email,
//       password: password,
//     },
//   });
// });
