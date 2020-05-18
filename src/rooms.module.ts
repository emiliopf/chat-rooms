import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Rooms } from './entities/rooms.entity';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms]),
  ],
  providers: [
    RoomsService,
    {
      inject: [ConfigService],
      provide: 'RABBITMQ',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('rabbitmq'));
      },
    },
  ],
  controllers: [RoomsController],
})
export class RoomsModule {}
