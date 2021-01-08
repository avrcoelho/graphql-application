import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class AuthDTO {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
