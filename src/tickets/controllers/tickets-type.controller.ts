import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TicketsTypeService } from '../services/tickets-type.service';
import {
  CreateTicketTypeDto,
  UpdateTicketTypeDto,
} from '../dtos/ticket-type.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('tickets-type')
@Controller('tickets-type')
export class TicketsTypeController {
  constructor(private ticketsTypeService: TicketsTypeService) {}

  @Get()
  find() {
    return this.ticketsTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsTypeService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateTicketTypeDto) {
    return this.ticketsTypeService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTicketTypeDto,
  ) {
    return this.ticketsTypeService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsTypeService.remove(id);
  }
}
