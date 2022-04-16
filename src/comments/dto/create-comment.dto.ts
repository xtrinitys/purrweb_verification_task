import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @IsString()
  @Length(2, 100)
  @ApiProperty()
  content: string;
}