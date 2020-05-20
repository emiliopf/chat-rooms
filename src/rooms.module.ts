import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Rooms } from './entities/rooms.entity';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';
import { CustomRabbitMQ } from './custom-rabbitmq-client';

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
        const { options } = configService.get('rabbitmq');
        return new CustomRabbitMQ(options)
      },
    },
  ],
  controllers: [RoomsController],
})
export class RoomsModule {}
