import { createParamDecorator, ExecutionContext, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import type { Request } from "express";
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
    public readonly email: string
  ) {}

  static fromRequest(request: Request): UserInfo {
    const { sub, permissions, email } = request.user! as any;
    return new UserInfo(sub, permissions || [], email);
  }

  get isAdmin(): boolean {
    return this.permissions && this.permissions.includes("admin");
  }
}

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
