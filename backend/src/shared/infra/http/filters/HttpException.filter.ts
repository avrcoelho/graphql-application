import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(UnauthorizedException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}
