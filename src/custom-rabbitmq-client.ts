import { ReadPacket, ClientRMQ } from '@nestjs/microservices';

export class CustomRabbitMQ extends ClientRMQ {

  protected dispatchEvent(packet: ReadPacket): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { pattern, data } = packet;
      const exchange = 'amq.topic';

      this.channel.assertExchange(exchange, 'topic');
      const published = await this.channel.publish('ROOM-223', '', Buffer.from(JSON.stringify(data)));
      
      if (published) {
        resolve(published);
      } else {
        reject(new Error('CUSTOM_RABBITMQ_CLIENT: Message not published'));
      }
    });
  }
}