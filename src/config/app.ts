import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  MICRO_USERS_PROTOCOL: process.env.MICRO_USERS_PROTOCOL,
  MICRO_USERS_HOST: process.env.MICRO_USERS_HOST,
  MICRO_USERS_PORT: process.env.MICRO_USERS_PORT,
  MICRO_USERS_GET_TOKEN_PATH: process.env.MICRO_USERS_GET_TOKEN_PATH,
  MICRO_USERS_CREATE_PATH: process.env.MICRO_USERS_CREATE_PATH,
}));
