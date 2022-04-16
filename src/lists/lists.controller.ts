import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { ListsService } from "./lists.service";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { UpdateListDto } from "./dto/update-list.dto";
import { ListsGuard } from "./lists.guard";
import { List } from "./entities/list.entity";

@ApiTags('lists')
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('users/:userId/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @ApiOperation({ summary: 'Get lists of the user' })
  @ApiOkResponse({ type: List, isArray: true })
  @Get()
  getUserLists(@Param('userId', ParseUUIDPipe) authorId: string) {
    return this.listsService.getUserLists(authorId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get list' })
  @ApiOkResponse({ type: List })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.listsService.getOne(id);
  }

  @Post()
  @UseGuards(ListsGuard)
  @ApiOperation({ summary: 'Create list' })
  @ApiCreatedResponse({ type: List })
  @ApiForbiddenResponse( { description: 'Forbidden' } )
  createOne(@Param('userId', ParseUUIDPipe) authorId: string, @Body() listDto: CreateListDto) {
    return this.listsService.createOne(listDto, authorId);
  }

  @Patch('/:id')
  @UseGuards(ListsGuard)
  @ApiOperation({ summary: 'Update list' })
  @ApiOkResponse({ type: List })
  @ApiForbiddenResponse( { description: 'Forbidden' } )
  updateOne(@Param('id', ParseUUIDPipe) id: string, @Body() listDto: UpdateListDto) {
    return this.listsService.updateOne(id, listDto);
  }

  @Delete('/:id')
  @UseGuards(ListsGuard)
  @ApiOperation({ summary: 'Delete list' })
  @ApiOkResponse({ description: 'Deleted' })
  @ApiForbiddenResponse( { description: 'Forbidden' } )
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.listsService.deleteOne(id);
  }
}