import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import UserEntity from '../../typeorm/entities/User.entity'
import CreateUserService from '../../../services/CreateUser.service';
import UserInput from '../inputs/User.input';

@Resolver(() => UserEntity)
export default class UserResolver {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: CreateUserService
  ) {}

  @Query(() => [UserEntity])
  public async index(
  ): Promise<[]> {
    return [];
  }

  @Mutation(() => UserEntity)
  public async create(
    @Args('data') input: UserInput,
  ): Promise<UserEntity> {
    
    const user = this.createUserService.execute(input);

    return user;
  }
}