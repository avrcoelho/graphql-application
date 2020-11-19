import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';

export default interface IUpdatePostDTO {
  id: string;
  user: UserEntity;
  title: string;
  content: string;
  image?: string;
}
