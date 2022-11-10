import { Injectable } from "@nestjs/common";
import assert from "assert";
import { isRunningInUnitTest } from "../../util";
import type { StartedTestContainer } from "testcontainers";

@Injectable()
export class LocalstackService {
  readonly endpoint: string;

  constructor(public readonly localstack: StartedTestContainer) {
    assert(isRunningInUnitTest);
    this.endpoint = `http://${localstack.getHost()}:${localstack.getMappedPort(
      4566
    )}`;
    console.info(`Localstack container started at ${this.endpoint}`);
  }

  async stop() {
    await this.localstack.stop();
  }
}
