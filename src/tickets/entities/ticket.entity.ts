import { Customer } from 'src/users/entities/customer.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { TicketType } from './ticket-type.entity';
@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'state', type: 'varchar' })
  state: string;

  @Column({ name: 'pay_method', type: 'varchar' })
  payMethod: string;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

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

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TicketType, (ticketType) => ticketType.tickets)
  @JoinColumn({ name: 'ticket_type_id' })
  ticketType: TicketType;

  @Expose()
  get price() {
    if (this.ticketType) {
      return this.ticketType.price;
    }
  }

  @Expose()
  get sector() {
    if (this.ticketType) {
      return this.ticketType.name;
    }
  }
  @Expose()
  get total() {
    if (this.ticketType) {
      return this.quantity * this.ticketType.price;
    }
  }
}
