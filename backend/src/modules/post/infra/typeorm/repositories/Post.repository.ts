import { EntityRepository, MongoRepository } from 'typeorm';

import IPostRepository from '@modules/post/repositories/IPost.repository';
import ICreatePostDTO from '@modules/post/dtos/ICreatePost.dto';
import Post from '../entities/Post.entity';
import { ObjectId } from 'mongodb';

@EntityRepository(Post)
class PostRepository extends MongoRepository<Post> implements IPostRepository {
  async findById(id: string): Promise<Post | undefined> {
    const post = await this.findOne(id);

    return post;
  }

  async findByUserId(user_id: string): Promise<Post[]> {
    const post = await this.find({
      where: {
        user_id: new ObjectId(user_id),
      },
      order: { created_at: 'DESC' },
    });

    return post;
  }

  public async createPost(postData: ICreatePostDTO): Promise<Post> {
    const post = this.create(postData);

    await this.save(post);

    return post;
  }

  async savePost(post: Post): Promise<Post> {
    return await this.save(post);
  }

  async deletePost(id: string): Promise<void> {
    await this.findOneAndDelete({ _id: new ObjectId(id) });
  }
}

export default PostRepository;
