import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Customer,User])],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
  exports:[CustomersService,UsersService]
})
export class UsersModule {}
