import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import PostEntity from '../../typeorm/entities/Post.entity';
import CreatePostService from '../../../services/CreatePost.service';
import GetPostService from '../../../services/GetPost.service';
import GetUserPostsService from '../../../services/GetUserPosts.service';
import PostInput from '../inputs/CreatePost.input';
import ICreatePostDTO from '../../../dtos/ICreatePost.dto';
import IUpdatePostDTO from '../../../dtos/IUpdatePost.dto';
import UpdatePostService from '../../../services/UpdatePost.service';
import DeletePostService from '../../../services/DeletePost.service';
import UpdatePostInput from '../inputs/UpdatePost.input';

interface IUser {
  id: string;
}

@UseGuards(JwtAuthGuard)
@Resolver(() => PostEntity)
export default class PostResolver {
  constructor(
    private readonly createPostService: CreatePostService,
    private readonly updatePostService: UpdatePostService,
    private readonly deletePostService: DeletePostService,
    private readonly getPostService: GetPostService,
    private readonly getUserPostsService: GetUserPostsService,
  ) {}

  @Query(() => [PostEntity])
  public async getUserPosts(@Args('id') id: string): Promise<PostEntity[]> {
    const post = await this.getUserPostsService.execute(id);

    return post;
  }

  public async getPost(@Args('id') id: string): Promise<PostEntity> {
    const post = await this.getPostService.execute(id);

    return post;
  }

  @Mutation(() => PostEntity)
  public async createPost(
    @Context('user') user: IUser,
    @Args('data') input: PostInput,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<PostEntity> {
    const user_id = user.id;

    new Promise(async () =>
      createReadStream().pipe(
        createWriteStream(
          resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            '..',
            'tmp',
            'images',
            filename,
          ),
        ),
      ),
    );

    const post = await this.createPostService.execute({
      user_id,
      data: { ...input, image: filename } as ICreatePostDTO,
    });

    return post;
  }

  @Mutation(() => PostEntity)
  public async updatePost(
    @Args('data') input: UpdatePostInput,
  ): Promise<PostEntity> {
    const post = await this.updatePostService.execute(input as IUpdatePostDTO);

    return post;
  }

  @Mutation(() => Boolean)
  public async deletePost(@Args('id') id: string): Promise<boolean> {
    const deleted = await this.deletePostService.execute(id);

    return deleted;
  }
}
