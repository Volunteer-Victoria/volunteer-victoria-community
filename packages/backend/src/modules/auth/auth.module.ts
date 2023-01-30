import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Module,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import type { Request } from "express";
import type { Observable } from "rxjs";
import { JwtStrategy } from "./jwt.strategy";

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return UserInfo.fromRequest(request);
  }
);

export class UserInfo {
  constructor(
    public readonly id: string,
    public readonly permissions: string[],
    public readonly email: string,
    public readonly emailVerified: boolean
  ) {}

  static fromRequest(request: Request): UserInfo {
    const { sub, permissions, email, email_verified } = request.user! as any;
    return new UserInfo(sub, permissions || [], email, email_verified);
  }

  get isAdmin(): boolean {
    return this.permissions && this.permissions.includes("admin");
  }
}

class EmailVerifiedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const { emailVerified } = UserInfo.fromRequest(req);
    if (!emailVerified) {
      throw new UnauthorizedException({
        code: "EMAIL_UNVERIFIED",
        message: "Email address for this account has not been verified",
      });
    } else {
      return true;
    }
  }
}

export function RequireAuth(
  options: { verifiedEmail: boolean } = { verifiedEmail: true }
): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => {
    UseGuards(AuthGuard("jwt"))(target, propertyKey, descriptor);
    ApiBearerAuth()(target, propertyKey, descriptor);

    const { verifiedEmail } = options;
    if (verifiedEmail) {
      UseGuards(EmailVerifiedGuard)(target, propertyKey, descriptor);
    }
  };
}

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
