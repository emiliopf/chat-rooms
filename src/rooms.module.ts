import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Rooms } from './entities/rooms.entity';
import { Users } from './entities/users.entity';
import { RoomsService } from './services/rooms.service';
import { RoomsController } from './controllers/rooms.controller';
import { CustomRabbitMQ } from './custom-rabbitmq-client';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms, Users]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.get('jwt.publicKey')
      })
    })
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
