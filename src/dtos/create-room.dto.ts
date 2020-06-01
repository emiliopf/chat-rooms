
import { IsNotEmpty, IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateRoomDto {


  @IsNotEmpty()
  @MaxLength(25)
  @IsAlphanumeric()
  alias: string;

  @IsNotEmpty()
  @MaxLength(8)
  @IsAlphanumeric()
  password: string;
}