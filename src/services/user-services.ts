import { User } from "../models/entity/user";
import { getConnection } from "typeorm";
import { NotFoundError } from "../errors/not-found-error";
import {
  CustomBaseEntity,
  RequiredEntityProps,
} from "../models/entity/base-entity";
import bcrypt from "bcrypt";
const QUERY_LIMIT = 50;

const getUserById = async (id: string) => {
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: id })
    .innerJoinAndSelect("user.service", "service")
    .select([
      "user.id",
      "user.email",
      "user.password",
      "user.created_at",
      "service.authMethod",
    ])
    .getOne();
  return user || null;
};

const getUserByEmail = async (email: string, serviceId: string) => {
  const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .andWhere("user.service = :serviceId", { serviceId: serviceId })
    .innerJoinAndSelect("user.service", "service")
    .select([
      "user.id",
      "user.email",
      "user.password",
      "user.created_at",
      "service.authMethod",
    ])
    .getOne();
  return user || null;
};

class GetManyUsersFilter {
  limit?: number = QUERY_LIMIT;
  skip?: number = 0;
  inIds?: string[] = undefined;
  serviceId?: string;
  order?: "ASC" | "DESC" = "DESC";
  orderBy?: keyof User | keyof CustomBaseEntity = "created_at";
  constructor(filter?: GetManyUsersFilter) {
    this.limit = filter?.limit || QUERY_LIMIT;
    this.skip = filter?.skip || 0;
    this.inIds = filter?.inIds || undefined;
    this.serviceId = filter?.serviceId || undefined;
    this.order = filter?.order || "DESC";
    this.orderBy = filter?.orderBy || "created_at";
  }
}
const getManyUsers = async (filters?: GetManyUsersFilter) => {
  filters = new GetManyUsersFilter(filters);
  // const query = getConnection().getRepository(User).createQueryBuilder("user");
  const users = await getConnection().manager.find(User, {
    loadRelationIds: true,
    select: ["id", "email", "created_at", "service"],
    ...(filters.serviceId && {
      where: {
        service: filters.serviceId,
      },
    }),
    skip: filters.skip,
    take: filters.limit,
    order: {
      [filters.orderBy!]: filters.order,
    },
  });
  return users;
};

const SALT_ROUNDS = 6;

const createUser = async (new_user: RequiredEntityProps<User>) => {
  const user = new User();
  user.email = new_user.email;
  user.password = new_user.password
    ? await bcrypt.hash(new_user.password!, SALT_ROUNDS)
    : undefined;
  user.service = new_user.service;
  await getConnection().manager.save(User, user);
  return user;
};

const updateUser = async (
  user: User | string | null,
  update: Partial<RequiredEntityProps<User>>
) => {
  if (typeof user === "string") {
    user = await getUserById(user);
    if (!user) {
      return null;
    }
  }
  let key: keyof User;
  for (key in user) {
    if (key in update && key !== "id") {
      // @ts-ignore
      user[key] = update[key] || user[key];
    }
  }
  await getConnection().manager.save(User, user!);
  return user;
};

const deleteUser = async (user: User | string | null) => {
  if (typeof user === "string") {
    user = await getUserById(user);
    if (!user) {
      throw new NotFoundError();
    }
  }
  await getConnection().manager.remove(User, user!);
};

const updateUserPassword = async (id: string, new_password: string) => {
  const user = await getConnection()
    .manager.save(User, {
      id: id,
      password: await bcrypt.hash(new_password, SALT_ROUNDS),
    })
    .catch(() => {
      return null;
    });
  return user || null;
};

const updateUserEmail = async (id: string, email: string) => {
  const user = await getConnection()
    .manager.save(User, {
      id: id,
      email: email,
    })
    .catch(() => {
      return null;
    });
  return user || null;
};

export {
  getUserById,
  getUserByEmail,
  getManyUsers,
  createUser,
  deleteUser,
  updateUser,
  updateUserPassword,
  updateUserEmail,
};
