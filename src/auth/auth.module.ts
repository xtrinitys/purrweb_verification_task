import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
