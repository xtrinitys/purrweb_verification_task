import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { List } from "../lists/entities/list.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, List])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
