import { app } from "../../app";
import { FakeCreds } from "../../test/cred-generator";
import { serviceRoutes } from "../route-opts/service-opts";

const createUser = async () => {
  const email = FakeCreds.email();
  const password = FakeCreds.password();
  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailSignUp,
    payload: {
      email: email,
      password: password,
    },
  });
  expect(response.statusCode).toEqual(201);
  console.log(response.body);
  return {
    email: email,
    password: password,
  };
};

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
  });

  expect(response.statusCode).not.toEqual(404);
});

it("attempts to log in without email", async () => {
  const user = await createUser();
  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
    payload: {
      password: user.password,
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in without password", async () => {
  const user = await createUser();

  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
    payload: {
      email: user.email,
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in with an invalid email", async () => {
  const user = await createUser();

  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
    payload: {
      email: "test@",
      password: user.password,
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in with an invalid password", async () => {
  const user = await createUser();

  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
    payload: {
      email: user.email,
      password: "password123",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in with an email that doesn't exist", async () => {
  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
    payload: {
      email: "testexists@test.com",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("logs user in successfully", async () => {
  const user = await createUser();
  console.log("USER", user);
  const response = await app.inject({
    method: "POST",
    url: serviceRoutes.emailLogIn,
    payload: {
      email: user.email,
      password: user.password,
    },
  });
  expect(response.statusCode).toEqual(200);
});
