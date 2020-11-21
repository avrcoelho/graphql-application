import {
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import UserEntity from '@modules/user/infra/typeorm/entities/User.entity';

@ObjectType()
@Entity('posts')
class PostEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => ID)
  @Column()
  user_id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: 'longtext' })
  content: string;

  @Field({ nullable: true })
  @Column()
  image: string | null;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => UserEntity)
  @ManyToOne(
    () => UserEntity,
    user => user.posts,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}

export default PostEntity;
