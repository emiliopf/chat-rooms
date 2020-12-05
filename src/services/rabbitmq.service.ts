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

  sendJoin(pattern: CustomRabbitMQPattern, message: CustomRabbitMQMessage) {

    return this.rabbitmq.emit(pattern, message);
  }

  sendMessage(pattern: CustomRabbitMQPattern, message: CustomRabbitMQMessage) {
    
    return this.rabbitmq.emit(pattern, message);
  }


  // sendInfo(idUser: number, idRoom: number, data: any) { 
  //   // const topic = this.rabbitmq.generateTopic(idRoom, 'INFO');

  //   return this.rabbitmq.emit('', data);
  // }

  // sendLogout(idUser: number, idRoom: number, data: any) {
  
  //   const message: CustomRabbitMQMessage = {
  //     type: 'topic',
  //     exchange: `ROOM-${idRoom}`,
  //     routingKey: 'message.info',
  //     content: data
  //   }

  //   return this.rabbitmq.emit(message.routingKey, message);
  // }
}