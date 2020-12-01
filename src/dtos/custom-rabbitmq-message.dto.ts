
import { IsNotEmpty, IsAlphanumeric, MaxLength, IsIn } from 'class-validator';

export class CustomRabbitMQMessage {


  @IsNotEmpty()
  @IsIn(['topic', 'direct', 'fanout'])
  type: string;

  @IsNotEmpty()
  exchange: string;

  @IsNotEmpty()
  routingKey: string;

  @IsNotEmpty()
  content: any;
}