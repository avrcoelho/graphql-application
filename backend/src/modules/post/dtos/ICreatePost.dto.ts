import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';

export default interface ICreatePostDTO {
  user: UserEntity;
  title: string;
  content: string;
  image?: string;
}
