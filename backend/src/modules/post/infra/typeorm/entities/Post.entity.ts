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
  @CreateDateColumn({ update: false })
  created_at: Date;

  @Field()
  @UpdateDateColumn({ insert: false })
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

  @Field(() => String, { nullable: true })
  get image_url() {
    return this.image ? `${process.env.APP_API_URL}/files/${this.image}` : null;
  }
}

export default PostEntity;
