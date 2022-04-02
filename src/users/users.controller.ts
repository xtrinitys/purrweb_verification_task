import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  //DEBUG
  @Get()
  getAll() {
    return this.userService.getAll();
  }
}
