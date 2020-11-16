import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import PostEntity from '@modules/post/infra/typeorm/entities/Post.entity';
import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import UserEntity from '../../typeorm/entities/User.entity';
import GetUserService from '../../../services/GetUser.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => PostEntity)
export default class GetUserPostResolver {
  constructor(private readonly getUserService: GetUserService) {}

  @ResolveField(() => UserEntity)
  public async user(@Parent() parent: PostEntity): Promise<UserEntity> {
    const userData = await this.getUserService.execute(parent.user_id);

    return userData;
  }
}
