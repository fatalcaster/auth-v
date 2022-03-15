import { RequiredEntityProps } from "../models/entity/base-entity";
import { Service } from "../models/entity/service";
import { getConnection } from "typeorm";
import { AuthMethod } from "../interfaces/user-payload";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 8;

const createService = async (new_service: RequiredEntityProps<Service>) => {
  const service = new Service();
  service.email = new_service.email;
  service.password = new_service.password
    ? await bcrypt.hash(new_service.password!, SALT_ROUNDS)
    : undefined;
  service.users = [];
  await getConnection().manager.save(Service, service);
  return service;
};

const getServiceById = async (id: string) => {
  const service = await getConnection().manager.findOne(Service, id);
  return service ? service : null;
};

const updateService = async (
  id: string,
  new_service: Partial<RequiredEntityProps<Service>>
) => {
  const service = await getServiceById(id);
  // service is not found...
  if (!service) {
    return null;
  }
  for (let key in service) {
    if (key !== "id")
      // @ts-ignore
      service[key] = new_service[key] || service[key];
  }
  return service;
};

const updateServiceAuthMethod = async (id: string, new_auth: AuthMethod) => {
  const service = await getConnection()
    .manager.save(Service, { id: id, authMethod: new_auth })
    .catch(() => {
      return null;
    });
  return service;
};

const updateServicePassword = async (id: string, new_password: string) => {
  const service = await getConnection()
    .manager.save(Service, {
      id: id,
      password: await bcrypt.hash(new_password, SALT_ROUNDS),
    })
    .catch(() => {
      return null;
    });
  return service;
};

const updateServiceEmail = async (id: string, new_email: string) => {
  const service = await getConnection().manager.update(
    Service,
    { id: id },
    { email: new_email }
  );
  if (typeof service.affected === "number" && service.affected > 1) {
    throw new Error("SOMETHING WENT WRONG");
  }
  return service.affected ? service : null;
};

const deleteService = async (id: string) => {
  const service = await getConnection().manager.delete(Service, { id: id });
  return service.affected ? service : null;
};

export {
  createService,
  getServiceById,
  updateService,
  updateServiceAuthMethod,
  updateServiceEmail,
  updateServicePassword,
  deleteService,
};
