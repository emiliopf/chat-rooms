import { Controller, Post, Body, Get, UseGuards, Request, UnauthorizedException, Param, NotFoundException } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { IsUserGuard } from '../guards/users.guard';
import { LoginRoomDto } from '../dtos/login-room.dto';
import { UsersConnector } from '../utils/users-connector';
import { RabbitMQService } from '../services/rabbitmq.service';
import { CustomRabbitMQMessage } from '../dtos/custom-rabbitmq-message.dto';
import { CustomRabbitMQPattern } from 'src/dtos/custom-rabbitmq-pattern.dto';

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

    // TODO (typescrypt 3.8) - Promise.allSetteld() 
    const { id: idRoom } = await this.roomsService.create(body);
    const { data: { id: idUser, alias } } = await this.usersConnector.create(body);


    const message: CustomRabbitMQMessage = {
      senderId: idUser,
      event: 'ROOM_CREATED',
      content: {
        user: {}
      }
    }

    const pattern: CustomRabbitMQPattern = {
      exchange: `ROOM-${idRoom}`,
      topic: 'MESSAGES'
    }

    this.rabbitMQService.sendMessage(pattern, message);


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

    const pattern: CustomRabbitMQPattern = {
      exchange: `ROOM-${idRoom}`,
      topic: 'MESSAGES'
    }

    return this.rabbitMQService.sendMessage(pattern, message);
  }

  @Post('/message')
  @UseGuards(IsUserGuard)
  async sendMessage(@Request() request, @Body() body) {
    const { user: idUser, room: idRoom } = request;
    const { input } = body;
    const { data: user } = await this.usersConnector.findById(idUser);

    const content = {
      input,
      user
    }

    const message: CustomRabbitMQMessage = {
      senderId: idUser,
      event: 'NEW_MESSAGE',
      content
    }

    const pattern: CustomRabbitMQPattern = {
      exchange: `ROOM-${idRoom}`,
      topic: 'MESSAGES'
    }

    return this.rabbitMQService.sendMessage(pattern, message);
    
  }

  @Get('/:idRoom')
  async checkExists(@Param('idRoom') idRoom: number) {
    const room = await this.roomsService.getRoom(idRoom);
    
    if (room) {
      return room;
    } else {
      throw new NotFoundException();
    }
  }


  @Post('/logout')
  @UseGuards(IsUserGuard)
  async logout(@Request() request) {
    const { user: idUser, room: idRoom } = request;
    const { data: user } = await this.usersConnector.findById(idUser);

    const message: CustomRabbitMQMessage = {
      senderId: idUser,
      event: 'USER_LEFT',
      content: {
        user: {
          idUser: user.id,
          alias: user.alias,
        }
      }
    }

    const pattern: CustomRabbitMQPattern = {
      exchange: `ROOM-${idRoom}`,
      topic: 'MESSAGES'
    }

    return this.rabbitMQService.sendMessage(pattern, message);
  }
}
