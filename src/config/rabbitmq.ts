import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('rabbitmq', () => ({
  // transport: Transport.RMQ,
  options: {
    urls: [`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}${process.env.RABBITMQ_VHOST}` || 'amqp://rabbitmq:5672/'],
  }
}));
