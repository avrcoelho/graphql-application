import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import jwtConfig from '@config/jwt';
import UserModule from '@modules/user/User.module';
import AuthService from './services/Auth.service';
import AuthResolver from './infra/http/graphql/resolvers/Auth.resolver';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export default class AuthModule {}
