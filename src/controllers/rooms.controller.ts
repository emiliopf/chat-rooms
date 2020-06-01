import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException, Param, NotFoundException } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { IsUserGuard } from '../guards/users.guard';
import { LoginRoomDto } from '../dtos/login-room.dto';
import { UsersConnector } from '../utils/users-connector';

@Controller('rooms')
export class RoomsController {

  constructor(
    private readonly roomsService: RoomsService,
    private readonly usersConnector: UsersConnector
  ) {}

  @Post('/create')
  async create(@Body() body: CreateRoomDto) {
    const rol = 'owner';
    
    // TODO (typescrypt 3.8) - Promise.allSetteld() 
    const { id: idRoom } = await this.roomsService.create(body);
    const { data: { id: idUser } } = await this.usersConnector.create(body);

    const { data: { token } } = await this.usersConnector.getToken({idRoom, idUser, rol});
    
    return { token };
  };

  @Post('/login')
  async login(@Body() body: LoginRoomDto) {
    const rol = 'guest';

    const { idRoom, password } = body;

    // TODO (typescrypt 3.8) - Promise.allSetteld() 
    const { data: { id: idUser } } = await this.usersConnector.create(body);
    const isCorrect = await this.roomsService.checkPassword(idRoom, password);

    if(isCorrect) {
      const { data: { token } } = await this.usersConnector.getToken({idRoom, idUser, rol});
    
      return { token };
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get('info/:idRoom')
  @UseGuards(IsUserGuard)
  async info(@Param('idRoom') idRoom: string) {
    const room = await this.roomsService.info(idRoom);

    if(room) {
      return room;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('/all')
  findAll(): Promise<Rooms[]> {
    return this.roomsService.findAll();
  }
}
