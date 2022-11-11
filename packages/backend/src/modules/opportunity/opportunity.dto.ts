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

class OpportunityBase {
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
  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  locationName!: string;

  @ApiProperty({ enum: IndoorsOrOutdoors })
  @IsEnum(IndoorsOrOutdoors)
  indoorsOrOutdoors!: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiProperty()
  @IsBoolean()
  criminalRecordCheckRequired!: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idealVolunteer!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  additionalInformation?: string;
}

export class OpportunityCreateDto extends OpportunityBase {}

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
