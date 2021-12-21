import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}
  async findAll() {
    return await this.usersRepo.find();
  }

  async findById(id: number) {
    const user = await this.usersRepo.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepo.findOne({ where: { email } });
  }


  async create(payload: CreateUserDto) {
    const newUser = this.usersRepo.create(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    return await this.usersRepo.save(newUser);
  }
  async update(id: number, changes: UpdateUserDto) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }

    if (changes.password) {
      const hashPassword = await bcrypt.hash(changes.password, 10);
      user.password = hashPassword;
    }
    this.usersRepo.merge(user, changes);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado`);
    }
    return this.usersRepo.delete(id);
  }
}
