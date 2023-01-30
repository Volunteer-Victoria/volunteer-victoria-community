import { Injectable, Module, OnModuleDestroy } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import createJWKSMock, { JWKSMock } from "mock-jwks";
import { JwtStrategy } from "./jwt.strategy";

const MOCK_ISSUER_URL = "https://mock.us.auth0.com/";
const MOCK_AUDIENCE = "https://localhost/api";

@Injectable()
export class MockJwksProvider implements OnModuleDestroy {
  private readonly jwks: JWKSMock;
  userId: string = "test-user";
  permissions: string[] = [];
  email: string = "test@mail.com";
  emailVerified: boolean = true;

  constructor() {
    process.env["AUTH0_ISSUER_URL"] = MOCK_ISSUER_URL;
    process.env["AUTH0_AUDIENCE"] = MOCK_AUDIENCE;
    this.jwks = createJWKSMock(MOCK_ISSUER_URL);
    this.jwks.start();
  }

  onModuleDestroy() {
    this.jwks.stop();
  }

  makeAdmin(): void {
    if (!this.permissions.includes("admin")) {
      this.permissions.push("admin");
    }
  }

  token(): string {
    return this.jwks.token({
      aud: MOCK_AUDIENCE,
      iss: MOCK_ISSUER_URL,
      sub: this.userId,
      permissions: this.permissions,
      email: this.email,
      email_verified: this.emailVerified,
    });
  }

  authHeaders(): { Authorization: string } {
    return {
      Authorization: `Bearer ${this.token()}`,
    };
  }
}

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [MockJwksProvider, JwtStrategy],
  exports: [PassportModule, MockJwksProvider],
})
export class AuthTestModule {}
