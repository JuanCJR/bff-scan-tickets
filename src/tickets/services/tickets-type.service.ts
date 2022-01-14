import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTicketTypeDto,
  UpdateTicketTypeDto,
} from '../dtos/ticket-type.dto';
import { TicketType } from '../entities/ticket-type.entity';
import { EventsService } from './events.service';
@Injectable()
export class TicketsTypeService {
  constructor(
    @InjectRepository(TicketType)
    private ticketTypeRepo: Repository<TicketType>,
    private eventService: EventsService,
  ) {}

  async findAll() {
    return await this.ticketTypeRepo.find();
  }

  async findById(id: number) {
    const ticketType = await this.ticketTypeRepo.findOne(id, {
      relations: ['tickets', 'event'],
    });
    if (!ticketType) {
      throw new NotFoundException(`Tipo de Ticket ${id} no encontrado`);
    }
    return ticketType;
  }

  async create(payload: CreateTicketTypeDto) {
    const newTicketType = this.ticketTypeRepo.create(payload);
    const event = await this.eventService.findById(payload.eventId);

    newTicketType.event = event;

    await this.ticketTypeRepo.save(newTicketType);
    return newTicketType;
  }

  async update(id: number, changes: UpdateTicketTypeDto) {
    const ticketType = await this.ticketTypeRepo.findOne(id);
    if (!ticketType) {
      throw new NotFoundException(`Tipo de Ticket ${id} no encontrado`);
    }
    this.ticketTypeRepo.merge(ticketType, changes);
    return await this.ticketTypeRepo.save(ticketType);
  }

  async remove(id: number) {
    const ticketType = await this.ticketTypeRepo.findOne(id);
    if (!ticketType) {
      throw new NotFoundException(`Tipo de Ticket ${id} no encontrado`);
    }
    return this.ticketTypeRepo.delete(id);
  }
}
