import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import type { Request } from "express";
import { JwtStrategy } from "./jwt.strategy";

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    permissions: string[];
  };
}

export function userId(request: AuthenticatedRequest): string {
  return request.user.sub;
}

export function isAdmin(request: AuthenticatedRequest): boolean {
  return request.user.permissions && "admin" in request.user.permissions;
}

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
