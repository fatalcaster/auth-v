import { ID } from "../../helpers/ID";
import { Service } from "../../models/entity/service";
import {
  createService,
  deleteService,
  getServiceById,
} from "../service-services";
import {
  createUser,
  deleteUser,
  getManyUsers,
  getUserByEmail,
  getUserById,
  updateUserEmail,
  updateUserPassword,
} from "../user-services";

const randomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const createServiceProvider = async (user?: string) => {
  const email = `${user || "service"}@service.com`;
  const service = await createService({ email: email });
  expect(ID.isValid(service.id)).toEqual(true);
  return service;
};
const createValidUser = async (username?: string, service?: Service) => {
  if (!service) service = await createServiceProvider();
  const email = `${username || "user"}@user.com`;
  const user = await createUser({ email: email, service: service });
  expect(ID.isValid(user.id)).toEqual(true);
  return { user, service };
};

it("creates a valid user", async () => {
  const service = await createServiceProvider();
  const user = await createUser({ email: "user@test.com", service: service });
  expect(ID.isValid(user.id)).toEqual(true);
});

it("creates a valid user", async () => {
  const service = await createServiceProvider();
  const user = await createUser({ email: "user@test.com", service: service });
  expect(ID.isValid(user.id)).toEqual(true);
});

it("creates multiple valid users at once", async () => {
  const service = await createServiceProvider();
  const arr = [
    createValidUser(randomString(), service),
    createValidUser(randomString(), service),
    createValidUser(randomString(), service),
    createValidUser(randomString(), service),
    createValidUser(randomString(), service),
  ];
  await Promise.all(arr);
  for (let i = 0; i < arr.length; i++) {
    expect(ID.isValid((await arr[i]).user.id)).toEqual(true);
  }
});

it("attempts to get a user with an email that doesn't exist", async () => {
  const service = await createServiceProvider();
  const user = await getUserByEmail("test@uknown.com", service.id);
  expect(user).toEqual(null);
});

it("attempts to get a user that doesn't exist", async () => {
  const service = await getUserById(ID.generate());
  expect(service).toEqual(null);
});

it("attempts to get a user with a valid email", async () => {
  const user = await createValidUser();
  const response = await getUserByEmail(user.user.email, user.service.id);

  expect(response).not.toEqual(null);
});

it("attempts to get users from a non-existent service", async () => {
  await createValidUser();
  const users = await getManyUsers({ serviceId: ID.generate() });
  expect(users).toEqual([]);
});

it("gets users from an existing service", async () => {
  const { service } = await createValidUser();
  await createValidUser("random", service);

  const users = await getManyUsers({ serviceId: service.id });
  expect(users.length).toEqual(2);
});

it("gets users from an existing service", async () => {
  const { user } = await createValidUser();

  const get_user = await getUserById(user.id);
  expect(get_user?.id).toEqual(user.id);
});

it("deletes all users of the deleted service", async () => {
  const { service, user } = await createValidUser("something");
  expect(ID.isValid(user.id)).toEqual(true);
  await deleteService(service.id);
  const deleted_user = await getUserById(user.id);
  expect(deleted_user).toEqual(null);
});

it("deletes an existing user", async () => {
  const { service, user } = await createValidUser("something");
  expect(ID.isValid(user.id)).toEqual(true);
  await deleteUser(user.id);
  const deleted_user = await getUserById(user.id);
  expect(deleted_user).toEqual(null);
  const get_service = await getServiceById(service.id);
  expect(ID.isValid(get_service?.id)).toEqual(true);
});

it("updates user password", async () => {
  const { user } = await createValidUser("user");
  const new_user = await updateUserPassword(user.id, "password");
  expect(user.password).not.toEqual(new_user?.password);
});

it("attempts to update user email with an already existing email within the same service", async () => {
  const service = await createServiceProvider();
  const { user: user1 } = await createValidUser("user1", service);
  const { user: user2 } = await createValidUser("user2", service);
  try {
    await updateUserEmail(user1.id, user2.email);
    expect(true).toEqual(false);
  } catch (err) {
    expect(true).toEqual(true);
  }
});
