import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Event } from './event.entity';
import { Ticket } from './ticket.entity';

//Una ticket tiene un tipo de ticket
//un tipo de ticket esta en muchos tickets
//Un evento tiene muchos tipos de ticket

@Entity({ name: 'ticket_type' })
export class TicketType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'price', type: 'int' })
  price: number;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Ticket, (tickets) => tickets.ticketType)
  tickets: Ticket[];

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
