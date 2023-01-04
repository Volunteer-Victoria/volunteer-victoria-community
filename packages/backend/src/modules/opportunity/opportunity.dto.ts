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

@Entity({ name: "opportunity" })
class OpportunityBase {
  @ApiProperty()
  @IsString()
  @Column()
  title!: string;

  @ApiProperty()
  @IsString()
  @Column()
  contactName!: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  requiredPeopleCount!: number;

  @IsISO8601({ strict: true })
  @Length(10, 10)
  @ApiProperty({
    example: "2022-11-24",
  })
  @Column({ nullable: true })
  occursDate?: string;

  @IsString()
  @ApiProperty({
    description: "Free-form text to describe when an opportunity occurs",
  })
  @Column({ nullable: true })
  occursTime?: string;

  @ApiProperty()
  @IsString()
  @Column()
  description!: string;

  @ApiProperty()
  @IsString()
  @Column()
  locationName!: string;

  @ApiProperty({ enum: IndoorsOrOutdoors })
  @IsEnum(IndoorsOrOutdoors)
  @Column()
  indoorsOrOutdoors!: string;

  @ApiProperty({ required: false, example: "person@email.com" })
  @IsEmail()
  @IsOptional()
  @Column({ nullable: true })
  contactEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  contactPhone?: string;

  @ApiProperty()
  @IsBoolean()
  @Column()
  criminalRecordCheckRequired!: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  idealVolunteer?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  additionalInformation?: string;
}

export class OpportunityCreateDto extends OpportunityBase {}

@Entity({ name: "opportunity" })
export class OpportunityResponseDto extends OpportunityBase {
  @ApiProperty()
  @IsString()
  @PrimaryColumn()
  opportunityId!: string;

  @ApiProperty({
    description: "Timestamp in millis when the opportunity was posted",
    example: 1668624857111,
  })
  @IsNumber()
  @Column()
  postedTime!: number;

  @ApiProperty()
  @IsString()
  @Column()
  postedByUserId!: string;
}
