import { readFileSync } from "fs";
import path from "path";

export = {
  JWT_ACCESS_PRIVATE: readFileSync(
    `${path.join(__dirname, "../../certs")}/jwt_access_priv.pem`
  ),
  JWT_ACCESS_PUBLIC: readFileSync(
    `${path.join(__dirname, "../../certs")}/jwt_access_pub.pem`
  ),
  JWT_REFRESH_PRIVATE: readFileSync(
    `${path.join(__dirname, "../../certs")}/jwt_refresh_priv.pem`
  ),
  JWT_REFRESH_PUBLIC: readFileSync(
    `${path.join(__dirname, "../../certs")}/jwt_refresh_pub.pem`
  ),
};
