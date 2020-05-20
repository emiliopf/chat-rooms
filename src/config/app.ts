import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  CORS_ORIGIN: process.env.CORS_ORIGIN,
}));
