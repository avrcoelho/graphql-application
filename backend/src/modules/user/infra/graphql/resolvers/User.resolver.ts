import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import UserEntity from '../../typeorm/entities/User.entity';
import CreateUserService from '../../../services/CreateUser.service';
import GetUserService from '../../../services/GetUser.service';
import UserInput from '../inputs/User.input';

interface IUser {
  id: string;
}

@Resolver(() => UserEntity)
export default class UserResolver {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  public async getUser(@Context('user') user: IUser): Promise<any> {
    const userData = this.getUserService.execute(user.id);

    return userData;
  }

  @Mutation(() => UserEntity)
  public async createUser(@Args('data') input: UserInput): Promise<UserEntity> {
    const user = await this.createUserService.execute(input);

    return user;
  }
}
