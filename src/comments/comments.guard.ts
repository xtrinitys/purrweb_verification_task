import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Repository } from "typeorm";

@Injectable()
export class CommentsGuard implements CanActivate {
  constructor(
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const cardId = req.cardId;
    const commentId = req.id;

    const comment = await this.commentsRepository.findOneOrFail({
      where: {
        id: commentId,
        card: cardId
      }
    });

    if (comment.author !== userId) {
      throw new UnauthorizedException();
    }

    return true;
  }
}