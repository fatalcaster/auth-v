import envConfig from "./env.config";
import { ConnectionOptions } from "typeorm";
export = {
  type: "postgres",
  host: envConfig.HOST,
  port: 5432,
  username: process.env.POSTGRES_USER || "user",
  password: process.env.POSTGRES_PASSWORD || "password",
  database: "tests",
  synchronize: true,
  logging: false,
  entities: ["src/models/entity/*.ts"],
  migrations: ["src/models/migration/*.ts"],
  subscribers: ["src/models/subscriber/*.ts"],
} as ConnectionOptions;
