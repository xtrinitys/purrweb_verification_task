import { IsString, Length } from "class-validator";

export class CreateCardDto {
  @Length(1, 50, {message: 'Incorrect title length'})
  @IsString()
  title: string;

  @IsString()
  content: string;
}