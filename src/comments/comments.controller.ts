import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../users/entities/user.entity";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentsGuard } from "./comments.guard";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Comment } from "./entities/comment.entity";

@ApiTags('comments')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Bad request' })
@Controller('/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get comments from card' })
  @ApiOkResponse({ type: Comment, isArray: true })
  @ApiNotFoundResponse({ description: 'Not found' })
  getCardComments(@Param('cardId', ParseUUIDPipe) cardId: string) {
    return this.commentsService.getCardComments(cardId);
  }

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  @ApiCreatedResponse({ type: Comment })
  createComment(
    @Body() commentDto: CreateCommentDto,
    @Param('cardId', ParseUUIDPipe) cardId: string,
    @GetUser() user: User
  ) {
    return this.commentsService.createOne(commentDto, cardId, user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get comment' })
  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Not found' })
  getComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.getOne(id);
  }

  @UseGuards(CommentsGuard)
  @ApiOperation({ summary: 'Update comment' })
  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Not found' })
  @Patch('/:id')
  updateComment(@Body() commentDto: UpdateCommentDto, @Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.updateOne(commentDto, id);
  }

  @UseGuards(CommentsGuard)
  @ApiOperation({ summary: 'Delete comment' })
  @ApiOkResponse({ description: 'Deleted' })
  @ApiNotFoundResponse( { description: 'Not found' })
  @Delete('/:id')
  deleteComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.delete(id);
  }
}
