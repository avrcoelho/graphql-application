import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import PostEntity from '../../typeorm/entities/Post.entity';
import CreatePostService from '../../../services/CreatePost.service';
import GetPostService from '../../../services/GetPost.service';
import PostInput from '../inputs/CreatePost.input';
import ICreatePostDTO from '../../../dtos/ICreatePost.dto';
import IUpdatePostDTO from '../../../dtos/IUpdatePost.dto';
import UpdatePostService from '../../../services/UpdatePost.service';
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
    private readonly getPostService: GetPostService,
  ) {}

  @Query(() => PostEntity)
  public async getPost(@Args('id') id: string): Promise<PostEntity> {
    const post = await this.getPostService.execute(id);

    return post;
  }

  @Mutation(() => PostEntity)
  public async createPost(
    @Context('user') user: IUser,
    @Args('data') input: PostInput,
  ): Promise<PostEntity> {
    const user_id = user.id;

    const post = await this.createPostService.execute({
      user_id,
      data: input as ICreatePostDTO,
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
}
