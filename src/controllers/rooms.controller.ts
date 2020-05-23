import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { Rooms } from '../entities/rooms.entity';
import { CreateRoomDto } from '../dtos/create-room.dto';
import { IsUserGuard } from '../guards/users.guard';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) {}

  @Post('/create')
  @UseGuards(IsUserGuard)
  async create(@Body() body: CreateRoomDto, @Request() request) {
    const { user: userId } = request;
    
    const { id } = await this.roomsService.create(Object.assign({userId}, body));
    return { id };
  };

  @Get('/all')
  findAll(): Promise<Rooms[]> {
    return this.roomsService.findAll();
  }
}
