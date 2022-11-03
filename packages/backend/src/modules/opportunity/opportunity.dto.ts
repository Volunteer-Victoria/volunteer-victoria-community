import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

enum IndoorsOrOutdoors {
  Indoors = "indoors",
  Outdoors = "outdoors",
}

class OpportunitySummaryBase {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  contactName!: string;

  @ApiProperty()
  @IsNumber()
  requiredPeopleCount!: number;

  @ApiProperty({
    example: 1666666666,
  })
  @IsNumber()
  startTime!: number;

  @ApiProperty({
    example: 1666666666,
  })
  @IsNumber()
  endTime!: number;
}

export class OpportunitySummaryResponseDto extends OpportunitySummaryBase {
  @ApiProperty()
  @IsString()
  opportunityId!: string;

  @ApiProperty({
    example: 1666666666,
  })
  @IsNumber()
  postedTime!: number;
}

class OpportunityBase extends OpportunitySummaryBase {
  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  locationName!: string;

  @ApiProperty({ enum: IndoorsOrOutdoors })
  @IsEnum(IndoorsOrOutdoors)
  indoorsOrOutdoors!: string;

  @ApiProperty({ nullable: true })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiProperty()
  @IsBoolean()
  criminalRecordCheckRequired!: boolean;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  idealVolunteer!: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  additionalInformation?: string;
}

export class OpportunityCreateDto extends OpportunityBase {}

export class OpportunityUpdateDto extends OpportunityBase {}

export class OpportunityResponseDto extends OpportunityBase {
  @ApiProperty()
  @IsString()
  opportunityId!: string;

  @ApiProperty({
    example: 1666666666,
  })
  @IsNumber()
  postedTime!: number;

  @ApiProperty()
  @IsString()
  postedByUserId!: string;
}
