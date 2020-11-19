import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import UserRepository from '../infra/typeorm/repositories/User.repository';
import User from '../infra/typeorm/entities/User.entity';
import IUserRepository from '../repositories/IUser.repository';

@Injectable()
class GetUserService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

export default GetUserService;
