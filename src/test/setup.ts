import { createConnection, getConnection } from "typeorm";
import { app } from "../app";
import { authRoutes } from "../routes/route-opts/auth-opts";
import dbConfig from "./../config/database.config";
declare global {
  var getAuthCookie: () => Promise<
    | {
        [x: string]: string;
      }
    | undefined
  >;
  var getAdminCookie: () => Promise<
    | {
        [x: string]: string;
      }
    | undefined
  >;
}
beforeAll(async () => {
  // app.register(testingRouter);
  // await MongoMemoryReplSet.create({
  //   replSet: { name: "testset", count: 1, storageEngine: "wiredTiger" },
  // });
  // const uri = replset.getUri();
  await createConnection(dbConfig);
});

// beforeEach(async () => {});

afterEach(async () => {
  // getConnection().manager.delete({});
  // Fetch all the entities
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.delete({}); // Clear each entity table's content
  }
});

afterAll(async () => {
  await app.close();
}, 35000);

global.getAuthCookie = async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "test@test.com",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(200);

  const cookie = response.cookies as { name: string; value: string }[];

  return {
    [cookie[0].name]: cookie[0].value,
    [cookie[1].name]: cookie[1].value,
  };
};

global.getAdminCookie = async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/auth/testing-admin",
  });
  expect(response.statusCode).toEqual(200);

  const cookie = response.cookies as { name: string; value: string }[];

  return {
    [cookie[0].name]: cookie[0].value,
    [cookie[1].name]: cookie[1].value,
  };
};
