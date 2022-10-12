import { FastifyReply, FastifyRequest } from "fastify";
// import { attachJwt } from "../../helpers/attach-jwt";
import { NotAuthorizedError } from "../errors/not-authorizer-error";
import {
  attachJwt,
  clearOldJWTData,
  createTokens,
  verifyJWT,
  verifyTokenOpts,
} from "../helpers/jwt-helper";
import config from "./../config/jwt.config";
// import { createUser } from "../../services/product-services";

async function getMeController(req: FastifyRequest, res: FastifyReply) {
  const { access_token, refresh_token } = req.cookies;
  const access_data = verifyJWT(
    access_token,
    config.JWT_ACCESS_PUBLIC,
    verifyTokenOpts
  );
  const refresh_data = verifyJWT(
    refresh_token,
    config.JWT_REFRESH_PUBLIC,
    verifyTokenOpts
  );

  if ((!access_data && !refresh_data) || !refresh_data)
    throw new NotAuthorizedError();

  clearOldJWTData(refresh_data);
  const tokens = createTokens(refresh_data);
  attachJwt(tokens.access, tokens.refresh, res);

  res.send(refresh_data);
}

export { getMeController };
