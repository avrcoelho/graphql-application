import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import IUserRepository from '@modules/user/repositories/IUser.repository';
import UserRepository from '@modules/user/infra/typeorm/repositories/User.repository';
import IPostRepository from '../repositories/IPost.repository';
import PostRepository from '../infra/typeorm/repositories/Post.repository';
import Post from '../infra/typeorm/entities/Post.entity';

@Injectable()
class GetUserPostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postsRepository: IPostRepository,

    @InjectRepository(UserRepository)
    private usersRepository: IUserRepository,
  ) {}

  async execute(user_id: string): Promise<Post[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const posts = await this.postsRepository.findByUserId(user_id);

    return posts;
  }
}

export default GetUserPostsService;
