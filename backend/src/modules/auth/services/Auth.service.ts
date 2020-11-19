import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import UserRepository from '@modules/user/infra/typeorm/repositories/User.repository';
import IHashProvider from '@modules/user/providers/hashProvider/models/IHash.provider';
import IUserRepository from '@modules/user/repositories/IUser.repository';

interface IRequest {
  email: string;
  password: string;
}

export interface IResponse {
  token: string;
  id: string;
}

@Injectable()
class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: IUserRepository,

    @Inject('HashProvider')
    private hashProvider: IHashProvider,

    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email.toLowerCase());

    if (!user) {
      throw new UnauthorizedException('Incorrect e-mail/password combination');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect e-mail/password combination');
    }

    const payload = { id: user.id };

    return {
      token: this.jwtService.sign(payload),
      id: user.id,
    };
  }
}

export default AuthService;
