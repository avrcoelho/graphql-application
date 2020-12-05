import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';
import IUpdatePostDTO from '../dtos/IUpdatePost.dto';
import { ObjectId } from 'mongodb';

@Injectable()
class UpdatePostService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,
  ) {}

  async execute(data: IUpdatePostDTO): Promise<Post> {
    const post = await this.postsRepository.findById(data.id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    Object.assign(post, { ...data, id: post.id });

    await this.postsRepository.savePost(post);

    return post;
  }
}

export default UpdatePostService;
