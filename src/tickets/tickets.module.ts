import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

import { TicketsController } from './controllers/tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './services/tickets.service';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { Event } from './entities/event.entity';
import { TicketType } from './entities/ticket-type.entity';
import { TicketsTypeService } from './services/tickets-type.service';
import { TicketsTypeController } from './controllers/tickets-type.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event, TicketType]), UsersModule],
  controllers: [TicketsController, EventsController, TicketsTypeController],
  providers: [TicketsService, EventsService, TicketsTypeService],
})
export class TicketsModule {}
