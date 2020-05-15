import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
