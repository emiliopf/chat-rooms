import { Injectable, Inject } from '@nestjs/common';
import { CustomRabbitMQ } from '../custom-rabbitmq-client';
import { CustomRabbitMQMessage } from '../dtos/custom-rabbitmq-message.dto';

@Injectable()
export class RabbitMQService {

  constructor(
    @Inject('RABBITMQ')
    private rabbitmq: CustomRabbitMQ,
  ) {}

  sendJoin(idRoom: number, message: CustomRabbitMQMessage) { 
    const pattern = `ROOM-${idRoom}`

    return this.rabbitmq.emit(pattern, message);
  }

  sendMessage(idRoom: number, message: CustomRabbitMQMessage) {
    const pattern = `ROOM-${idRoom}.MESSAGES`

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