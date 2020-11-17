import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { pubSub } from './Post.resolver';

import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';
import PostEntity from '../../typeorm/entities/Post.entity';

@Resolver(() => UserEntity)
export default class GetPostsUserResolver {
  @Subscription(() => PostEntity, {
    filter: (payload, variables) =>
      String(payload.postAdded.user_id) === variables.user_id,
  })
  postAdded(@Args('user_id') user_id: string) {
    return pubSub.asyncIterator('postAdded');
  }

  @Subscription(() => PostEntity, {
    filter: (payload, variables) => {
      console.log(payload);
      return String(payload.postUpdated.user_id) === variables.user_id;
    },
  })
  postUpdated(@Args('user_id') user_id: string) {
    return pubSub.asyncIterator('postUpdated');
  }

  @Subscription(() => String, {
    filter: (payload, variables) =>
      String(payload.postDelected.user_id) === variables.user_id,
  })
  postDelected(@Args('user_id') user_id: string) {
    return pubSub.asyncIterator('postDelected');
  }
}
