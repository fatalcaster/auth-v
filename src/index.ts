import { createConnection } from "typeorm";
import { app } from "./app";
import config from "./config/env.config";
import dbConfig from "./config/database.config";
const start = async () => {
  try {
    await createConnection(dbConfig);
    app.listen({ port: config.PORT as number }, () => {
      console.log(`Listening on PORT ${config.PORT}`);
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
