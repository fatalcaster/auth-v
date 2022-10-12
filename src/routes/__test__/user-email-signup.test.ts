import { app } from "../../app";
import { ID } from "../../helpers/ID";
import { cutIdParamOff } from "../../helpers/string-helper";
import { createService } from "../../services/service-services";
import { userRoutes } from "../route-opts/user-opts";
import { FakeCreds } from "../../test/cred-generator";
const testRoutes = {
  emailSignUp: cutIdParamOff(userRoutes.emailSignUp),
  emailLogIn: cutIdParamOff(userRoutes.emailLogIn),
};
const createServiceProvider = async () => {
  const email = FakeCreds.email();
  const password = FakeCreds.password();
  const service = await createService({ email: email, password: password });
  expect(ID.isValid(service.id)).toEqual(true);
  return service;
};

it("Returns code different than 404", async () => {
  const service = await createServiceProvider();
  const url = `${testRoutes.emailSignUp}${service.id}`;
  console.log(url);
  const response = await app.inject({
    method: "POST",
    url: url,
    payload: {
      email: FakeCreds.email(),
      password: FakeCreds.password(),
    },
  });
  console.log(response.statusCode);
  expect(response.statusCode).not.toEqual(404);
});

it("creates user for the given service", async () => {
  const service = await createServiceProvider();
  const callback = "https://stackoverflow.com/";
  const url = `${testRoutes.emailSignUp}${service.id}?cb=${callback}`;
  console.log(url);
  const response = await app.inject({
    method: "POST",
    url: url,
    payload: {
      email: FakeCreds.email(),
      password: FakeCreds.password(),
    },
  });
  expect(response.statusCode).toEqual(201);
});
