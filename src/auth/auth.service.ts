import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtToken } from "../common/entities/jwt-token.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(dto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(dto.email);

    if (candidate) {
      throw new HttpException({message: 'User already exists'}, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({...dto, password: hashPassword});

    return this.generateToken(user);
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.getByEmail(email);

    if (user) {
      const passwordEquals = await bcrypt.compare(pass, user.password);

      if (passwordEquals) {
        return user;
      }
    }

    return null;
  }

  async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id }
    return new JwtToken(this.jwtService.sign(payload), payload.sub);
  }
}
