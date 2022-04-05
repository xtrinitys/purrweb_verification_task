import { IsEmail, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({example: 'user@test.com'})
  email: string;

  @IsString()
  @Length(4, 100, {
    message: 'Password must be at least 4 characters long'
  })
  @ApiProperty({example: 'testpassword'})
  password: string;
}