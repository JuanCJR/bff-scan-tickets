import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

import { TicketsController } from './controllers/tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './services/tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UsersModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
