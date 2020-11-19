import {
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import PostEntity from '@modules/post/infra/typeorm/entities/Post.entity';

@ObjectType()
@Entity('users')
class UserEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [PostEntity])
  @OneToMany(
    () => PostEntity,
    post => post.user,
  )
  posts: PostEntity[];
}

export default UserEntity;
