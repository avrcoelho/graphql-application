import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import UserModule from './modules/user/User.module';
import AuthModule from './modules/auth/Auth.module';
import PostModule from './modules/post/Post.module';

@Module({
  imports: [
    HttpModule,
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      uploads: {
        maxFileSize: 20000000, // 20 MB
        maxFiles: 5,
      },
    }),
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
