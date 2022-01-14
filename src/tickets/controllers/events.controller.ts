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

import { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventsService } from '../services/events.service';

@UseGuards(JwtAuthGuard)
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  find() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateEventDto) {
    return this.eventService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventDto,
  ) {
    return this.eventService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.remove(id);
  }
}
