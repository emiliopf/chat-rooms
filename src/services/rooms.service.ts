import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from '../entities/rooms.entity';
import { Repository } from 'typeorm';
import { CustomRabbitMQ } from '../custom-rabbitmq-client';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,
    @Inject('RABBITMQ')
    private rabbitmq: CustomRabbitMQ,
  ) {}

  create(data: any) {
    const room = new Rooms();
    room.password = data.password;
    room.userId = data.userId;
    // this.rabbitmq.emit('fooooo',data)
    //   .subscribe({
    //     complete: () => {
    //       console.log('finish emit');
    //     },
    //     next: (res) => {
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.error('kapachao!');
    //       console.log(err);
    //     }
    //   });
    return this.roomsRepository.save(room);
  }

  findAll(): Promise<Rooms[]> {
    return this.roomsRepository.find();
  }
}
