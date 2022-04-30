import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  async findAll() {
    return await this.customerRepo.find({ relations: ['tickets'] });
  }

  async findById(id: number) {
    const customer = await this.customerRepo.findOne(id, {
      relations: ['tickets'],
    });

    if (!customer) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return customer;
  }

  async findTicketByRut(rut: string) {
    const customer = await this.customerRepo.findOne({
      where: { rut },
      relations: ['tickets', 'tickets.ticketType'],
    });

    if (!customer) {
      throw new NotFoundException(`Entraba bajo el Rut ${rut} no encontrado`);
    }
    return customer;
  }

  async validaExists(rut: string) {
    const user = await this.customerRepo.findOne({ where: { rut } });
    if (!user) {
      return false;
    }
    return user;
  }
  async create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);

    return await this.customerRepo.save(newCustomer);
  }
  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Cliente ${id} no encontrado`);
    }
    return await this.customerRepo.delete(id);
  }
}
