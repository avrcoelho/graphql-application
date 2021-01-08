import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';
import GetUserPostsService from '../../../../services/GetUserPosts.service';
import PostEntity from '../../../typeorm/entities/Post.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => UserEntity)
export default class GetPostsUserResolver {
  constructor(private readonly getUserPostsService: GetUserPostsService) {}

  @ResolveField(() => [PostEntity])
  public async posts(@Parent() user: UserEntity): Promise<PostEntity[]> {
    const posts = await this.getUserPostsService.execute(user.id);

    return posts;
  }
}
