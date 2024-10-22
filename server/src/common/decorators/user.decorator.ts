import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJWTPayload } from 'src/auth/types';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserJWTPayload;
});
