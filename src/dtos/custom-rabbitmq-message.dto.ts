
import { IsNotEmpty, IsAlphanumeric, MaxLength, IsIn } from 'class-validator';

export class CustomRabbitMQMessage {

  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  @IsIn(['USER_JOIN', 'NEW_MESSAGE'])
  event: string;

  @IsNotEmpty()
  content: any;
}