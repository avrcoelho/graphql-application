import { Args, Mutation, Resolver } from '@nestjs/graphql';

import AuthService, { IResponse } from '../../../services/Auth.service';
import AuthInput from '../inputs/Auth.input';
import AuthResult from '../results/Auth.result';

@Resolver()
export default class AuthResolver {
  constructor(private readonly createUserService: AuthService) {}

  @Mutation(() => AuthResult)
  public async auth(@Args('data') input: AuthInput): Promise<IResponse> {
    const user = this.createUserService.execute(input);

    return user;
  }
}
