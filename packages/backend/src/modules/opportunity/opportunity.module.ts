import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OpportunityController } from "./opportunity.controller";
import { OpportunityEntity } from "./opportunity.entity";
import { OpportunityService } from "./opportunity.service";

@Module({
  imports: [TypeOrmModule.forFeature([OpportunityEntity])],
  controllers: [OpportunityController],
  providers: [OpportunityService],
})
export class OpportunityModule {}
