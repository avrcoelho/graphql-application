import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from '@modules/user/User.module';
import UserRepository from './infra/typeorm/repositories/Post.repository';
import CreatePostService from './services/CreatePost.service';
import UpdatePostService from './services/UpdatePost.service';
import GetPostService from './services/GetPost.service';
import PostResolver from './infra/graphql/resolvers/Post.resolver';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [
    CreatePostService,
    UpdatePostService,
    GetPostService,
    PostResolver,
  ],
})
export default class PostModule {}
