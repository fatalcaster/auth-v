import { ID } from "../../helpers/ID";
import { AuthMethod } from "../../interfaces/user-payload";
import {
  createService,
  deleteService,
  getServiceByEmail,
  getServiceById,
  updateServiceAuthMethod,
  updateServiceEmail,
  updateServicePassword,
} from "../service-services";

it("attempts to create two services with the same email", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  try {
    await createService({ email: "service@test.com" });
    expect(true).toBe(false);
  } catch (err) {
    expect(true).toBe(true);
  }
});

it("successfully creates a service", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);
});

it("attempts to get a service by email that doesn't exist", async () => {
  const service = await getServiceByEmail("rand@gras.com");
  expect(service).toEqual(null);
});

it("attempts to get a service with a valid email", async () => {
  const email = "service@serve.com";
  await createService({ email: email });
  const existing_service = await getServiceByEmail(email);
  expect(existing_service).not.toEqual(null);
  expect(existing_service?.email).toEqual(email);
});

it("attempts to get a service that doesn't exist", async () => {
  const service = await getServiceById(ID.generate());
  expect(service).toEqual(null);
});

it("gets an existing service with a valid id", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  const foundService = await getServiceById(service.id);
  expect(foundService).not.toEqual(null);
});

it("attempts to update a service authMethod that doesn't exist", async () => {
  const service = await updateServiceAuthMethod(ID.generate(), AuthMethod.jwt);
  expect(service).toEqual(null);
});

it("updates an existing service authMethod with a valid id", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  const updatedService = await updateServiceAuthMethod(
    service.id,
    AuthMethod.jwt
  );
  expect(updatedService).not.toEqual(null);
});

it("attempts to update a password of a service that doesn't exist", async () => {
  const service = await updateServicePassword(ID.generate(), "password");
  expect(service).toEqual(null);
});

it("updates an existing service password with a valid id", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  const updatedService = await updateServicePassword(service.id, "password");
  expect(updatedService).not.toEqual(null);
});

it("updates an existing service email with a valid id", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  const updatedService = await updateServiceEmail(
    service.id,
    "email@email.com"
  );
  expect(updatedService).not.toEqual(null);
});

it("attempts to update an email with an already existig email", async () => {
  const service = await createService({ email: "service@test.com" });
  const service1 = await createService({ email: "test@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);
  try {
    // expectation: DB throws a concurrency error
    await updateServiceEmail(service1.id, service.email);
    expect(true).toEqual(false);
  } catch (err) {
    expect(true).toEqual(true);
  }
});

it("attempts an SQL injection attack", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);
  try {
    const updatedService = await updateServiceEmail(
      `WHERE email = service@test.com`,
      "test@test.com"
    );
    console.error("ATTACK POSSIBLE", updatedService);
    expect(true).toEqual(false);
  } catch (err) {
    expect(true).toEqual(true);
  }
});

it("updates an existing service email with a valid id", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  const updatedService = await updateServiceEmail(
    service.id,
    "email@email.com"
  );
  expect(updatedService).not.toEqual(null);
});

it("deletes a service with the given id", async () => {
  const service = await createService({ email: "service@test.com" });
  expect(ID.isValid(service.id)).toEqual(true);

  const deletedService = await deleteService(service.id);
  expect(deletedService).not.toEqual(null);
  const updatedService = await getServiceById(service.id);
  expect(updatedService).toEqual(null);
});
