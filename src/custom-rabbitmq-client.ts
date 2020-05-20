import { ClientProxy, ReadPacket, PacketId, WritePacket, ClientRMQ } from '@nestjs/microservices';


export class CustomRabbitMQ extends ClientRMQ {

  protected dispatchEvent(packet: ReadPacket): Promise<any> {
    return new Promise(() => {
      console.log('custom dispatch');
      const exchange = 'amq.topic';
      this.channel.assertExchange(exchange, 'topic');
      this.channel.publish(exchange, 'explorer', Buffer.from('foo'));
    });
  }
}