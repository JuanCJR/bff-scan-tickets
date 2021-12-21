import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}
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

  async create(payload: CreateUserDto) {
    const newUser = this.usersRepo.create(payload);

    return await this.usersRepo.save(newUser);
  }
  async update(id:number, changes:UpdateUserDto) {
      const user = await this.usersRepo.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuario ${id} no encontrado`);
      }
      this.usersRepo.merge(user,changes);
      return this.usersRepo.save(user);
  }

  async remove(id:number){
    const user = await this.usersRepo.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuario ${id} no encontrado`);
      }
    return this.usersRepo.delete(id);
  }
}
