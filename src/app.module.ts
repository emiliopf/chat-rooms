import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database';
import rabbitmmqConfig from './config/rabbitmq';
import appConfig from './config/app';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [
        databaseConfig,
        rabbitmmqConfig,
        appConfig,
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (configService.get('database')),
    }),
    RoomsModule,
  ],
})
export class AppModule {}
