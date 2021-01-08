import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';

import StorageProvider from '@shared/providers/storageProvider';
import UserModule from '@modules/user/User.module';
import UserRepository from './infra/typeorm/repositories/Post.repository';
import CreatePostService from './services/CreatePost.service';
import UpdatePostService from './services/UpdatePost.service';
import DeletePostService from './services/DeletePost.service';
import GetPostService from './services/GetPost.service';
import GetUserPostsService from './services/GetUserPosts.service';
import PostResolver from './infra/http/graphql/resolvers/Post.resolver';
import GetPostsUserResolver from './infra/http/graphql/resolvers/GetPostsUser.resolver';
import PostSubscriptionsResolver from './infra/http/graphql/resolvers/PostSubscriptions.resolver';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [
    CreatePostService,
    UpdatePostService,
    GetPostService,
    GetUserPostsService,
    DeletePostService,
    PostResolver,
    GetPostsUserResolver,
    PostSubscriptionsResolver,
    {
      provide: 'StorageProvider',
      useClass: StorageProvider,
    },
    {
      provide: 'PubSub',
      useValue: new PubSub(),
    },
  ],
})
export default class PostModule {}
