import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { Rooms } from '../entities/rooms.entity';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) {}

  @Post('/create')
  create(@Body() body: any) {
    return this.roomsService.create(body);
  };

  @Post('/example')
  example() {
    console.log('example controler');
    return this.roomsService.example();
  };

  @Get('/all')
  findAll(): Promise<Rooms[]> {
    return this.roomsService.findAll();
  }
}
