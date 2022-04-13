import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "../users/entities/user.entity";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>
  ) {}

  async getCardComments(cardId: string): Promise<Comment[]> {
    return await this.commentsRepository.find( { where: { card: cardId } });
  }

  async createOne(commentDto: CreateCommentDto, cardId: string, user: User): Promise<Comment> {
    return await this.commentsRepository.save({
      ...commentDto,
      card: cardId,
      author: user.id
    })
  }

  async getOne(id: string): Promise<Comment> {
    return await this.commentsRepository.findOne(id);
  }

  async updateOne(commentDto: UpdateCommentDto, id: string): Promise<Comment> {
    return await this.commentsRepository.save({
      ...commentDto,
      id: id
    })
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.commentsRepository.delete(id);
  }
}
