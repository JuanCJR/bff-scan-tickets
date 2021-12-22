import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as nodemailer from 'nodemailer';
import { ConfigType } from '@nestjs/config';

import { CustomersService } from 'src/users/services/customers.service';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreateTicketDto, UpdateTicketDto } from '../dtos/ticket.dto';
import { Ticket } from '../entities/ticket.entity';
import config from 'src/config';


@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    @Inject(config.KEY) private configService:ConfigType<typeof config>,
    private customerService: CustomersService,
    private userService: UsersService,

  ) {}

  async findAll() {
    return await this.ticketRepo.find({relations:["customer","user"]});
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

    await this.ticketRepo.save(newTicket);

    const emailUser = this.configService.app.emailSenderUser;
    const emailPassword = this.configService.app.emailSenderPassword;
    let trasnporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPassword,
      }
    });

    let info = trasnporter.sendMail({
      from: emailUser,
      to: customer.email,
      subject: `Notificacion Compra de Entrada `,
      html: `
      <div style="text-align: left;">
        <h3>Detalle de Compra</h3>
        <hr class="featurette-divider">
        <p>Ticket #${newTicket.id}</p>
        <p>Sector: ${newTicket.sector}</p>
        <p>Metodo de Pago: ${newTicket.payMethod}</p>
        <p>Cliente: ${customer.rut} ${customer.firstName} ${customer.lastName}</p>
        <p>Email: ${customer.email}</p>
        <p>Fecha de Compra: ${newTicket.purchaseDate}</p>
        <p>Fecha de Evento: ${newTicket.date}</p>
        <h4><strong>Nota: Una semana antes del evento se le sera enviado los tickets con el codigo QR para la validacion de ingreso.</strong></h4>
        <h4><strong>Importante: Para evitar robo de su ticket, no compartir el codigo QR</strong></h4>
        <hr class="featurette-divider">
        <p>Nro Tickets: ${newTicket.quantity}</p>
        <p>Valor Unitario: ${newTicket.price}CLP</p>
        <hr class="featurette-divider">
        <h5>Total: ${newTicket.total}CLP</h5></div>
        <hr class="featurette-divider">
        <p>Contacto de atencion: +56921216284 </p> 
            `
    });

    console.log("Message sent: %s", info.messageId);

    return newTicket;

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
