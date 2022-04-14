import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
  @Length(1, 50, {message: 'Incorrect title length'})
  @IsString()
  @ApiProperty({ example: 'Some card title' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'Card content bla bla bla' })
  content: string;
}