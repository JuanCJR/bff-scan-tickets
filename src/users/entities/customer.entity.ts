import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'rut', type: 'varchar', length: 255, unique: true })
  rut: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Column({ name: 'birthday', type: 'date' })
  birthday: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Ticket, (tickets) => tickets.customer)
  tickets: Ticket[];
}
