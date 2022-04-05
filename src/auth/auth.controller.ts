import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { JwtToken } from "../common/entities/jwt-token.entity";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary: 'Sign in user'})
  @ApiBasicAuth('LocalAuthGuard')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: JwtToken,
    description: 'User signed in'
  })
  @ApiUnauthorizedResponse({ description: "Incorrect email or password" })
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  // TODO: mb use guard, for unauthorized only
  // TODO: mb add different response messages
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({
    status: 201,
    type: JwtToken,
    description: 'User created'
  })
  @ApiBadRequestResponse({ description: 'User already exists or incorrect user data' })
  @Post('/signup')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registerUser(userDto);
  }
}
