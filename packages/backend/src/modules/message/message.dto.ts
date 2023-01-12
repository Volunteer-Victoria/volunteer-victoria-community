import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ThreadStartDto {
  @ApiProperty()
  @IsString()
  applicantName!: string;

  @ApiProperty()
  @IsString()
  message!: string;
}
