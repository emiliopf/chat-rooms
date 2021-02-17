import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from '../entities/rooms.entity';
import { Repository } from 'typeorm';
import { CustomRabbitMQ } from '../custom-rabbitmq-client';
import * as bcrypt from 'bcrypt';


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

    return this.roomsRepository.save(room);
  }

  async getRoom(id: number): Promise<Rooms> {
    return this.roomsRepository.findOne({select: ['id'], where: { id }});
  }

  async checkPassword(idRoom: string, entryPassword: string): Promise<boolean> {
    const { password: encryptedPassword } = await this.roomsRepository.findOne(idRoom, {select: ['password']});
    return  await bcrypt.compare(entryPassword, encryptedPassword);
  }

}
