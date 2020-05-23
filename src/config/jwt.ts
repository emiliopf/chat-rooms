import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  publicKey: process.env.JWT_PUBLIC_KEY,
}));
