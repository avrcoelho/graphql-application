import { Args, Mutation, Resolver } from '@nestjs/graphql';

import AuthService, { IResponse } from '../../../services/Auth.service';
import AuthDTO from '../dtos/Auth.dto';
import AuthModel from '../models/Auth.model';

@Resolver()
export default class AuthResolver {
  constructor(private readonly createUserService: AuthService) {}

  @Mutation(() => AuthModel)
  public async auth(@Args('data') input: AuthDTO): Promise<IResponse> {
    const user = this.createUserService.execute(input);

    return user;
  }
}
