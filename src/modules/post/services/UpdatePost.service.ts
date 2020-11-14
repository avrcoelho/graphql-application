import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';
import IUpdatePostDTO from '../dtos/IUpdatePost.dto';

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

    Object.assign(post, data);

    await this.postsRepository.createPost(post);

    return post;
  }
}

export default UpdatePostService;
