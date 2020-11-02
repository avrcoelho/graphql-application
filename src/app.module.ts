import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TypeOrmConfig from '@config/typeorm'
import UserModule from './modules/user/User.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
