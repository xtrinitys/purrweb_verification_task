import { User } from "../../users/entities/user.entity";
import { IsInstance, IsString, MaxLength, MinLength } from "class-validator";

export class CreateListDto {
  @MinLength(5, {
    message: 'Name of the list is too short'
  })
  @MaxLength(50, {
    message: 'Name of the list is too long'
  })
  @IsString()
  name: string;

  @IsInstance(User)
  author: User;
}