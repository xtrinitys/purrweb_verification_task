import { Module } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { ListsController } from "./lists.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ListsService],
  controllers: [ListsController]
})
export class ListsModule {}
