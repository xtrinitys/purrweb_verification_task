import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateListDto {
  @MinLength(5, {
    message: 'Name of the list is too short'
  })
  @MaxLength(50, {
    message: 'Name of the list is too long'
  })
  @IsString()
  name: string;
  //
  // @IsUUID()
  // author: User['id'];
}