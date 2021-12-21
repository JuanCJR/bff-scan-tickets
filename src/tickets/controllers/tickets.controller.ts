import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TicketsService } from '../services/tickets.service';
import { CreateTicketDto,UpdateTicketDto } from '../dtos/ticket.dto';
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private ticketService:TicketsService){}

    @Get()
    find() {
      return this.ticketService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.ticketService.findById(id);
    }
  
    @Post()
    create(@Body() payload: CreateTicketDto) {
      return this.ticketService.create(payload);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateTicketDto,
    ) {
      return this.ticketService.update(id, payload);
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.ticketService.remove(id);
    }

}
