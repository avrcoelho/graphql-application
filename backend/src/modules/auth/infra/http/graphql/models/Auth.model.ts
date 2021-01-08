import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class AuthModel {
  @Field()
  readonly token: string;

  @Field()
  readonly id: string;
}
