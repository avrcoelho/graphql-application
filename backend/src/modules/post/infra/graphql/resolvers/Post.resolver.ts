import { UseGuards, Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context, ID } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import JwtAuthGuard from '@shared/infra/graphql/guards/jwt-auth.guard';
import PostEntity from '../../typeorm/entities/Post.entity';
import CreatePostService from '../../../services/CreatePost.service';
import GetPostService from '../../../services/GetPost.service';
import GetUserPostsService from '../../../services/GetUserPosts.service';
import PostInput from '../inputs/CreatePost.input';
import ICreatePostDTO from '../../../dtos/ICreatePost.dto';
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

    @Inject('PubSub')
    private pubSub: PubSub,
  ) {}

  @Query(() => [PostEntity])
  public async getUserPosts(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<PostEntity[]> {
    const post = await this.getUserPostsService.execute(id);

    return post;
  }

  @Query(() => PostEntity)
  public async getPost(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<PostEntity> {
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
      data: { ...input, image: null } as ICreatePostDTO,
    });

    this.pubSub.publish('postAdded', { postAdded: post });

    return post;
  }

  @Mutation(() => PostEntity)
  public async updatePost(
    @Args('data') input: UpdatePostInput,
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<PostEntity> {
    const post = await this.updatePostService.execute({ data: input, id });

    this.pubSub.publish('postUpdated', { postUpdated: post });

    return post;
  }

  @Mutation(() => Boolean)
  public async deletePost(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<boolean> {
    const post = await this.deletePostService.execute(id);

    this.pubSub.publish('postDelected', { postDelected: post });

    return true;
  }
}
