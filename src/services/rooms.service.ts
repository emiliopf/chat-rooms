import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from '../entities/rooms.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Rooms)
    private roomsRepository: Repository<Rooms>,
    @Inject('RABBITMQ')
    private rabbitmq: ClientProxy,
  ) {}

  create(data: any) {
    const room = new Rooms();
    room.password = data.password;
    this.rabbitmq.emit('foo',data)
      .subscribe({
        complete: () => {
          console.log('finish emit');
        },
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('kapachao!');
          console.log(err);
        }
      });
    return this.roomsRepository.save(room);
  }

  findAll(): Promise<Rooms[]> {
    return this.roomsRepository.find();
  }
}
