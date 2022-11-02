import { Module } from "@nestjs/common";
import { LocalstackService } from "./localstack.service";
import { GenericContainer } from "testcontainers";

const LOCALSTACK_IMAGE = "docker.io/localstack/localstack:1.2";

@Module({
  providers: [
    {
      provide: LocalstackService,
      useFactory: async () => {
        const container = await new GenericContainer(LOCALSTACK_IMAGE)
          .withExposedPorts(4566)
          .start();
        return new LocalstackService(container);
      },
    },
  ],
})
export class LocalstackModule {}
