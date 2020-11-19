import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class AuthResult {
  @Field()
  readonly token: string;

  @Field()
  readonly id: string;
}
