import { Module } from "@nestjs/common";
import { LocalstackService } from "./localstack.service";
import { GenericContainer, StartedTestContainer } from "testcontainers";

const LOCALSTACK_IMAGE = "docker.io/localstack/localstack:1.2";

// Share a container between all tests so it doesn't get pointlessly recreated.
let localstackContainer: StartedTestContainer | undefined;

@Module({
  providers: [
    {
      provide: LocalstackService,
      useFactory: async () => {
        if (localstackContainer === undefined) {
          console.log("Starting localstack container");
          localstackContainer = await new GenericContainer(LOCALSTACK_IMAGE)
            .withExposedPorts(4566)
            .start();
        }
        return new LocalstackService(localstackContainer);
      },
    },
  ],
  exports: [LocalstackService],
})
export class LocalstackModule {}
