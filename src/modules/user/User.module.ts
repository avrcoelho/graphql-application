import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserRepository from './infra/typeorm/repositories/User.repository';
import CreateUserService from './services/CreateUser.service';
import BCryptHashProvider from './providers/hashProvider/implementations/BCryptHash.provider';
import UserResolver from './infra/graphql/resolvers/User.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    CreateUserService,
    UserResolver,
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
})
export default class UserModule {}
