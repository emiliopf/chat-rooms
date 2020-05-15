import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from './rooms.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [databaseConfig]
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
