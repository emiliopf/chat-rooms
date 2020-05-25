
import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginRoomDto {


  @IsNotEmpty()
  idRoom: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;
}