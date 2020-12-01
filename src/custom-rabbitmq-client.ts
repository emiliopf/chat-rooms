import { ReadPacket, ClientRMQ } from '@nestjs/microservices';

export class CustomRabbitMQ extends ClientRMQ {

  protected dispatchEvent(packet: ReadPacket): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { pattern, data } = packet;

      const { exchange, type, routingKey, content } = data;

      this.channel.assertExchange(exchange, type);
      const published = await this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(content)));
      
      if (published) {
        console.log(published);
        resolve(published);
      } else {
        reject(new Error('CUSTOM_RABBITMQ_CLIENT: Message not published'));
      }
    });
  }
}