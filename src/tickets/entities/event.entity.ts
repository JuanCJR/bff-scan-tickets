import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { TicketType } from './ticket-type.entity';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'site', type: 'varchar' })
  site: string;

  @Column({ name: 'event_date', type: 'timestamp' })
  eventDate: Date;

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

  @OneToMany(() => TicketType, (ticketsType) => ticketsType.event)
  ticketsType: TicketType[];
}
