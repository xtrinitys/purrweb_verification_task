import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateListDto {
  @MinLength(2, {
    message: 'Name of the list is too short'
  })
  @MaxLength(50, {
    message: 'Name of the list is too long'
  })
  @IsString()
  @ApiProperty({ example: 'Todo list' })
  name: string;
}