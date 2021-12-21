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

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'state', type: 'varchar' })
  state: string;

  @Column({ name: 'pay_method', type: 'varchar' })
  payMethod: string;

  @Column({ name: 'sector', type: 'varchar' })
  sector: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'purchase_date', type: 'date' })
  purchaseDate: Date;

  @Column({ name: 'price', type: 'int' })
  price: number;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

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

  @ManyToOne(() => Customer, (customer) => customer.tickets)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  
}
