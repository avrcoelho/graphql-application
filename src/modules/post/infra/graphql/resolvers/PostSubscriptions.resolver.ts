import { Resolver, Subscription } from '@nestjs/graphql';
import { pubSub } from './Post.resolver';

import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';
import PostEntity from '../../typeorm/entities/Post.entity';

@Resolver(() => UserEntity)
export default class GetPostsUserResolver {
  @Subscription(() => PostEntity)
  postAdded() {
    return pubSub.asyncIterator('postAdded');
  }

  @Subscription(() => PostEntity)
  postUpdated() {
    return pubSub.asyncIterator('postUpdated');
  }

  @Subscription(() => String)
  postDelected() {
    return pubSub.asyncIterator('postDelected');
  }
}
