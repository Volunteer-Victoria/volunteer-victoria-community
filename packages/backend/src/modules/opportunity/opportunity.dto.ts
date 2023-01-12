import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Entity, Column, PrimaryColumn } from "typeorm";

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

  @IsISO8601({ strict: true })
  @Length(10, 10)
  @ApiProperty({
    example: "2022-11-24",
  })
  occursDate?: string;

  @IsString()
  @ApiProperty({
    description: "Free-form text to describe when an opportunity occurs",
  })
  occursTime?: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  locationName!: string;

  @ApiProperty({ enum: IndoorsOrOutdoors })
  @IsEnum(IndoorsOrOutdoors)
  indoorsOrOutdoors!: string;

  @ApiProperty({ required: true, example: "person@email.com" })
  @IsEmail()
  contactEmail!: string;

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
  idealVolunteer?: string;

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
    description: "Timestamp in millis when the opportunity was posted",
    example: 1668624857111,
  })
  @IsNumber()
  postedTime!: number;

  @ApiProperty()
  @IsString()
  postedByUserId!: string;
}
