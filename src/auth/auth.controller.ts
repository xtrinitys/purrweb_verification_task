import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { JwtToken } from "../common/entities/jwt-token.entity";
import { SkipJwt } from "../common/decorators/skip-jwt.decorator";
import { User } from "../users/entities/user.entity";
import { GetUser } from "../common/decorators/get-user.decorator";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @SkipJwt()
  @ApiOperation({summary: 'Sign in user'})
  @ApiBasicAuth('LocalAuthGuard')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: JwtToken, description: 'User signed in' })
  @ApiUnauthorizedResponse({ description: "Incorrect email or password" })
  async login(@GetUser() user: User) {
    return this.authService.generateToken(user);
  }

  @Post('/signup')
  @SkipJwt()
  @ApiOperation({ summary: 'Sign up user' })
  @ApiCreatedResponse({type: JwtToken, description: 'User created'})
  @ApiBadRequestResponse({ description: 'User already exists or incorrect user data' })
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registerUser(userDto);
  }
}
