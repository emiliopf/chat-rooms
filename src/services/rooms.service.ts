import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from '../entities/rooms.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,
  ) {}

  create(data: any) {
    const room = new Rooms();
    room.password = data.password;
    return this.roomsRepository.save(room);
  }

  findAll(): Promise<Rooms[]> {
    return this.roomsRepository.find();
  }
}
