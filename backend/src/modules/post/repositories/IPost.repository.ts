import Post from '../infra/typeorm/entities/Post.entity';
import ICreatePostDTO from '../dtos/ICreatePost.dto';

export default interface IPostRepository {
  findById(id: string): Promise<Post | undefined>;
  findByUserId(user_id: string): Promise<Post[]>;
  createPost(data: ICreatePostDTO): Promise<Post>;
  savePost(post: Post): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
