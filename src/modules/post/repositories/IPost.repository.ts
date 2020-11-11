import Post from '../infra/typeorm/entities/Post.entity';
import ICreatePostDTO from '../dtos/ICreatePost.dto';

export default interface IPostRepository {
  findById(id: string): Promise<Post | undefined>;
  findByUserId(user_id: string): Promise<Post | undefined>;
  createPost(data: ICreatePostDTO): Promise<Post>;
}
