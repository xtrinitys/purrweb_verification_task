import { Controller, Get, Request } from "@nestjs/common";

@Controller()
export class AppController {
  // TODO: DEBUG ONLY
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
