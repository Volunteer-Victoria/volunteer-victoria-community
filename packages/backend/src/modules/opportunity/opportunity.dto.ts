import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsEmail } from "class-validator";

enum IndoorsOrOutdoors {
  Indoors,
  Outdoors,
}

class OpportunitySummaryBase {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  contactName!: string;

  @ApiProperty()
  requiredPeopleCount!: number;

  @ApiProperty({
    example: 1666666666,
  })
  startTime!: number;

  @ApiProperty({
    example: 1666666666,
  })
  endTime!: number;

  @ApiProperty({
    example: 1666666666,
  })
  postedTime!: number;
}

export class OpportunitySummaryResponseDto extends OpportunitySummaryBase {
  @ApiProperty()
  opportunityId!: string;
}

class OpportunityBase extends OpportunitySummaryBase {
  @ApiProperty()
  description!: string;

  @ApiProperty()
  locationName!: string;

  @ApiProperty({ enum: IndoorsOrOutdoors })
  @IsEnum(IndoorsOrOutdoors)
  indoorsOrOutdoors!: string;

  @ApiProperty()
  @IsEmail()
  contactEmail!: string;

  @ApiProperty()
  contactPhone!: string;

  @ApiProperty()
  criminalRecordCheckRequired!: boolean;

  @ApiProperty()
  idealVolunteer!: string;

  @ApiProperty({ nullable: true })
  additionalInformation?: string;
}

export class OpportunityCreateDto extends OpportunityBase {}

export class OpportunityUpdateDto extends OpportunityBase {}

export class OpportunityResponseDto extends OpportunityBase {
  @ApiProperty()
  opportunityId!: string;

  @ApiProperty()
  postedByUserId!: string;
}
