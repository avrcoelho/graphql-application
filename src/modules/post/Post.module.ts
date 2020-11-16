import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import StorageProvider from '@shared/providers/storageProvider';
import UserModule from '@modules/user/User.module';
import UserRepository from './infra/typeorm/repositories/Post.repository';
import CreatePostService from './services/CreatePost.service';
import UpdatePostService from './services/UpdatePost.service';
import DeletePostService from './services/DeletePost.service';
import GetPostService from './services/GetPost.service';
import GetUserPostsService from './services/GetUserPosts.service';
import PostResolver from './infra/graphql/resolvers/Post.resolver';
import GetPostsUserResolver from './infra/graphql/resolvers/GetPostsUser.resolver';

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
    {
      provide: 'StorageProvider',
      useClass: StorageProvider,
    },
  ],
})
export default class PostModule {}
