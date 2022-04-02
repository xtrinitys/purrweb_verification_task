import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.getByEmail(email);

    if (user) {
      // TODO: BCRYPT
      // const passwordEquals = await bcrypt.compare(pass, user.password,);
      const passwordEquals = pass === user.password;

      if (passwordEquals) {
        return user;
      }
    }

    return null;
  }

  async generateToken(user: User) {
    const payload = {email: user.email, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
