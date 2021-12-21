import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/users/services/customers.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateTicketDto, UpdateTicketDto } from '../dtos/ticket.dto';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    private customerService: CustomersService,
    private userService: UsersService,
  ) {}

  async findAll() {
    return await this.ticketRepo.find();
  }

  async findById(id: number) {
    const ticket = await this.ticketRepo.findOne(id, {
      relations: ['customer', 'user'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} no encontrado`);
    }
    return ticket;
  }

  async create(payload: CreateTicketDto) {
    const newTicket = this.ticketRepo.create(payload);
    const customer = await this.customerService.findById(payload.customerId);
    const user = await this.userService.findById(payload.userId);

    newTicket.customer = customer;
    newTicket.user = user;

    return await this.ticketRepo.save(newTicket);
  }

  async update(id: number, changes: UpdateTicketDto) {
    const ticket = await this.ticketRepo.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} no encontrado`);
    }

    this.ticketRepo.merge(ticket, changes);
    return await this.ticketRepo.save(ticket);
  }

  async remove(id: number) {
    const ticket = await this.ticketRepo.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket ${id} no encontrado`);
    }
    return this.ticketRepo.delete(id);
  }
}
