import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsUUID } from "class-validator";

// TODO: check validation
export class JwtToken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'})
  @IsJWT()
  access_token: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  sub: string;

  constructor(token: string, sub: string) {
    this.access_token = token;
    this.sub = sub;
  }
}