
import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class CreateRoomDto {

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}