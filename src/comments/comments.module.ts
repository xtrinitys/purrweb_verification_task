import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Card } from "../cards/entities/card.entity";
import { Comment } from "./entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Card])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
