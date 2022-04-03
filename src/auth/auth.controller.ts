import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  // TODO: mb use guard, for unauthorized only
  @Post('/signup')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registerUser(userDto);
  }
}
