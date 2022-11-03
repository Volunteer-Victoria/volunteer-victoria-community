import { Test, TestingModule } from "@nestjs/testing";
import { DynamoDBTestModule } from "../ddb/ddb.test.module";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityEntity } from "./opportunity.entity";
import { OpportunityService } from "./opportunity.service";

describe("OpportunityController", () => {
  let opportunityController: OpportunityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OpportunityController],
      providers: [OpportunityService, OpportunityEntity],
      imports: [DynamoDBTestModule],
    }).compile();

    opportunityController = app.get(OpportunityController);
  });

  describe("get", () => {
    it("should return the empty list at the start", async () => {
      expect(await opportunityController.get()).toEqual([]);
    });
  });
});
