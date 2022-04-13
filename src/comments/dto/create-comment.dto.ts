import { IsString, Length } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @Length(2, 100)
  content: string;
}