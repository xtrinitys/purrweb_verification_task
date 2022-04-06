import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateListDto {
  @MinLength(5, {
    message: 'Name of the list is too short'
  })
  @MaxLength(50, {
    message: 'Name of the list is too long'
  })
  @IsString()
  name: string;
}