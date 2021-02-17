import { Injectable, Inject } from '@nestjs/common';
import { CustomRabbitMQPattern } from 'src/dtos/custom-rabbitmq-pattern.dto';
import { CustomRabbitMQ } from '../custom-rabbitmq-client';
import { CustomRabbitMQMessage } from '../dtos/custom-rabbitmq-message.dto';

@Injectable()
export class RabbitMQService {

  constructor(
    @Inject('RABBITMQ')
    private rabbitmq: CustomRabbitMQ,
  ) {}

  sendMessage(pattern: CustomRabbitMQPattern, message: CustomRabbitMQMessage) {
    
    return this.rabbitmq.emit(pattern, message);
  }
}