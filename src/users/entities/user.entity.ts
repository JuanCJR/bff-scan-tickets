import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'varchar' })
  role: string;

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

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
