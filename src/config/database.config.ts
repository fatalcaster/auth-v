import envConfig from "./env.config";
import { ConnectionOptions } from "typeorm";
export = {
  type: "postgres",
  host: envConfig.HOST,
  port: 5432,
  username: "user",
  password: "password",
  database: "tests",
  synchronize: true,
  logging: false,
  entities: ["src/models/entity/*.ts"],
  migrations: ["src/models/migration/*.ts"],
  subscribers: ["src/models/subscriber/*.ts"],
} as ConnectionOptions;
