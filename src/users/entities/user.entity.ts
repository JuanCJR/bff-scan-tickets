import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';

import { Exclude } from 'class-transformer';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
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
  updatedAt: Date;

  @Exclude()
  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @Expose()
  get ticketsSolds() {
    if (this.tickets) {
      return this.tickets.length;
    } else {
      return 0;
    }
  }

  // @Expose()
  // get profit() {
  //   if (this.tickets) {
  //     let acu = 0;
  //     this.tickets.forEach((item) => {
  //       acu += item.total;
  //     });
  //     return acu;
  //   } else {
  //     return 0;
  //   }
  // }
}
