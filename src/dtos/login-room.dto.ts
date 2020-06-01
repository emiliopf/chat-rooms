
import { IsNotEmpty, IsAlphanumeric, MaxLength } from 'class-validator';

export class LoginRoomDto {


  @IsNotEmpty()
  idRoom: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsAlphanumeric()
  alias: string;
}