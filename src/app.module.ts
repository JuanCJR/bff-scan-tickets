import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:enviroments[process.env.NODE_ENV || '.env'],
    load:[config],
    isGlobal:true,
    validationSchema:Joi.object({
      TYPEORM_HOST: Joi.string().required(),
      TYPEORM_USERNAME: Joi.string().required(),
      TYPEORM_PASSWORD: Joi.string().required(),
      TYPEORM_DATABASE: Joi.string().required(),
      TYPEORM_PORT: Joi.number().required(),
      TYPEORM_LOGGING: Joi.boolean().required(),
      TYPEORM_ENTITIES: Joi.string().required(),
      TYPEORM_MIGRATIONS: Joi.string().required(),
      TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
      TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().required(),
      APP_PORT: Joi.number().required(),
      JWT_SECRET:Joi.string().required()
    })
  }),UsersModule, TicketsModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
