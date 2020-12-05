
import { IsNotEmpty } from 'class-validator';

export class CustomRabbitMQPattern {

  @IsNotEmpty()
  exchange: string;

  @IsNotEmpty()
  topic: string;
}