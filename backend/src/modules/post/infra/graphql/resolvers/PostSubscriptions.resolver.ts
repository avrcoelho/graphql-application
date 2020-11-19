import { Inject } from '@nestjs/common';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';
import PostEntity from '../../typeorm/entities/Post.entity';

@Resolver(() => UserEntity)
export default class GetPostsUserResolver {
  constructor(
    @Inject('PubSub')
    private pubSub: PubSub,
  ) {}

  @Subscription(() => PostEntity, {
    filter: (payload, variables) =>
      String(payload.postAdded.user_id) === variables.user_id,
  })
  postAdded(@Args('user_id') user_id: string) {
    return this.pubSub.asyncIterator('postAdded');
  }

  @Subscription(() => PostEntity, {
    filter: (payload, variables) => {
      console.log(payload);
      return String(payload.postUpdated.user_id) === variables.user_id;
    },
  })
  postUpdated(@Args('user_id') user_id: string) {
    return this.pubSub.asyncIterator('postUpdated');
  }

  @Subscription(() => PostEntity, {
    filter: (payload, variables) =>
      String(payload.postDelected.user_id) === variables.user_id,
  })
  postDelected(@Args('user_id') user_id: string) {
    return this.pubSub.asyncIterator('postDelected');
  }
}
