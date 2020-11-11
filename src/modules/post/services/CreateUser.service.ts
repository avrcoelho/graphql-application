import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import UserRepository from '../infra/typeorm/repositories/User.repository';
import User from '../infra/typeorm/entities/User.entity';
import IHashProvider from '../providers/hashProvider/models/IHash.provider';
import IUserRepository from '../repositories/IUser.repository';
import ICreateUserDTO from '../dtos/ICreateUser.dto';

@Injectable()
class CreateUserService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(
      email.toLowerCase(),
    );

    if (checkUserExists) {
      throw new BadRequestException('E-mail address already registered');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
