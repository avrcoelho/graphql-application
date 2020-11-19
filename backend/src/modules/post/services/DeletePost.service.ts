import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import PostEntity from '../infra/typeorm/entities/Post.entity';

@Injectable()
class DeletePostService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,
  ) {}

  async execute(id: string): Promise<PostEntity> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postsRepository.deletePost(id);

    return post;
  }
}

export default DeletePostService;
