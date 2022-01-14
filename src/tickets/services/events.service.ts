import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from '../dtos/event.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private eventRepo: Repository<Event>) {}

  async findAll() {
    return await this.eventRepo.find();
  }

  async findById(id: number) {
    const event = await this.eventRepo.findOne(id, {
      relations: ['tickets'],
    });
    if (!event) {
      throw new NotFoundException(`Evento ${id} no encontrado`);
    }
    return event;
  }

  async create(payload: CreateEventDto) {
    const newEvent = this.eventRepo.create(payload);
    await this.eventRepo.save(newEvent);
    return newEvent;
  }

  async update(id: number, changes: UpdateEventDto) {
    const event = await this.eventRepo.findOne(id);
    if (!event) {
      throw new NotFoundException(`Evento ${id} no encontrado`);
    }
    this.eventRepo.merge(event, changes);
    return await this.eventRepo.save(event);
  }

  async remove(id: number) {
    const event = await this.eventRepo.findOne(id);
    if (!event) {
      throw new NotFoundException(`Evento ${id} no encontrado`);
    }
    return this.eventRepo.delete(id);
  }
}
