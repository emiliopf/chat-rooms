import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException, Param, NotFoundException } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { IsUserGuard } from '../guards/users.guard';
import { LoginRoomDto } from '../dtos/login-room.dto';
import { UsersConnector } from '../utils/users-connector';
import { RabbitMQService } from '../services/rabbitmq.service';
import { CustomRabbitMQMessage } from '../dtos/custom-rabbitmq-message.dto';
import database from 'src/config/database';

@Controller('')
export class RoomsController {

  constructor(
    private readonly roomsService: RoomsService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly usersConnector: UsersConnector
  ) {}

  @Post('/create')
  async create(@Body() body: CreateRoomDto) {
    const rol = 'owner';

    console.log('roomController - create');
    
    // TODO (typescrypt 3.8) - Promise.allSetteld() 
    const { id: idRoom } = await this.roomsService.create(body);
    const { data: { id: idUser, alias } } = await this.usersConnector.create(body);

    const { data: { token } } = await this.usersConnector.getToken({idRoom, idUser, alias, rol});
    
    return { token };
  };

  @Post('/login')
  async login(@Body() body: LoginRoomDto) {
    const rol = 'guest';

    const { idRoom, password } = body;

    // TODO (typescrypt 3.8) - Promise.allSetteld() 
    const { data: { id: idUser, alias } } = await this.usersConnector.create(body);
    const isCorrect = await this.roomsService.checkPassword(idRoom, password);

    if(isCorrect) {
      const { data: { token } } = await this.usersConnector.getToken({idRoom, idUser, alias, rol});
      
      return { token };
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('/loginSuccess')
  @UseGuards(IsUserGuard)
  async loginSuccess(@Request() request) {
    const { user: idUser, room: idRoom } = request;
    const { data: user } = await this.usersConnector.findById(idUser);

    console.log(user);

    const message: CustomRabbitMQMessage = {
      senderId: idUser,
      event: 'USER_JOIN',
      content: {
        user: {
          idUser: user.id,
          alias: user.alias,
          rol: 'guest',
        }
      }
    }

    return this.rabbitMQService.sendJoin(idRoom, message);
  }

  @Post('/message')
  @UseGuards(IsUserGuard)
  async sendMessage(@Request() request, @Body() body) {
    const { user: idUser, room: idRoom } = request;
    const { content } = body;
    const { data: user } = await this.usersConnector.findById(idUser);

    const message: CustomRabbitMQMessage = {
      senderId: idUser,
      event: 'NEW_MESSAGE',
      content
    }

    console.log(message);

    return this.rabbitMQService.sendMessage(idRoom, message);
    
  }


  // @Post('/sendInfo')
  // @UseGuards(IsUserGuard)
  // async sendRoomInfo(@Body() body, @Request() request) {
  //   const { user: idUser, room: idRoom, rol } = request;

  //   if (rol !== 'owner') return new UnauthorizedException();

  //   const data = {
  //     type: 'ROOM_INFO',
  //     event: 'REFRESH',
  //     sender: idUser,
  //     content: body
  //   }
  //   return this.rabbitMQService.sendInfo(idUser, idRoom, data);
  // }


  // @Post('/logout')
  // @UseGuards(IsUserGuard)
  // async logout(@Body() body, @Request() request) {
  //   const { user: idUser, room: idRoom, rol } = request;

  //   // if (rol !== 'owner') return new UnauthorizedException();

  //   const data = {
  //     type: 'ROOM_INFO',
  //     event: 'USER_LOGOUT',
  //     sender: idUser,
  //     content: {
  //       idUser
  //     }
  //   }
  //   return this.rabbitMQService.sendLogout(idUser, idRoom, data);
  // }

  // @Get('info/:idRoom')
  // // @UseGuards(IsUserGuard)
  // async info(@Param('idRoom') idRoom: string) {
  //   const room = await this.roomsService.info(idRoom);

  //   if(room) {
  //     return room;
  //   } else {
  //     throw new NotFoundException();
  //   }
  // }

  // @Get('/all')
  // findAll(): Promise<Rooms[]> {
  //   return this.roomsService.findAll();
  // }
}
