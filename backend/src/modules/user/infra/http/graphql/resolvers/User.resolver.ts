import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';

import JwtAuthGuard from '@shared/infra/http/guards/jwt-auth.guard';
import UserEntity from '../../../typeorm/entities/User.entity';
import CreateUserService from '../../../../services/CreateUser.service';
import GetUserService from '../../../../services/GetUser.service';
import UserDTO from '../dtos/User.dto';

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
  public async createUser(@Args('data') input: UserDTO): Promise<UserEntity> {
    const user = await this.createUserService.execute(input);

    return user;
  }
}
