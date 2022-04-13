import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../users/entities/user.entity";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller('/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getCardComments(@Param('cardId', ParseUUIDPipe) cardId: string) {
    return this.commentsService.getCardComments(cardId);
  }

  @Post()
  createComment(
    @Body() commentDto: CreateCommentDto,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @GetUser() user: User
  ) {
    return this.commentsService.createOne(commentDto, cardId, user);
  }

  @Get('/:id')
  getComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.getOne(id);
  }

  @Patch('/:id')
  updateComment(@Body() commentDto: UpdateCommentDto, @Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.updateOne(commentDto, id);
  }

  @Delete('/:id')
  deleteComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.delete(id);
  }
}
