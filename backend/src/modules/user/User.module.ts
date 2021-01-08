import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserRepository from './infra/typeorm/repositories/User.repository';
import CreateUserService from './services/CreateUser.service';
import GetUserService from './services/GetUser.service';
import BCryptHashProvider from './providers/hashProvider/implementations/BCryptHash.provider';
import UserResolver from './infra/http/graphql/resolvers/User.resolver';
import GetMessageUserResolver from './infra/http/graphql/resolvers/GetUserPost.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    CreateUserService,
    GetUserService,
    UserResolver,
    GetMessageUserResolver,
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
  exports: [
    TypeOrmModule.forFeature([UserRepository]),
    {
      provide: 'HashProvider',
      useClass: BCryptHashProvider,
    },
  ],
})
export default class UserModule {}
