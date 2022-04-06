import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { ListsService } from "./lists.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdateListDto } from "./dto/update-list.dto";
import { ListsGuard } from "./lists.guard";

@ApiTags('lists')
@UseGuards(ListsGuard)
@Controller('users/:userId/lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  createOne(@Param('userId') authorId: string, @Body() listDto: CreateListDto) {
    return this.listsService.createOne(listDto, authorId);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.listsService.getOne(id);
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() listDto: UpdateListDto) {
    return this.listsService.updateOne(id, listDto);
  }

  //TODO: getCardsInTheList(@Param('id') id: string)
  @Get('/:id/cards')
  getCardsInTheList(@Param('id') id: string) {
    return this.listsService.getCards(id);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.listsService.deleteOne(id);
  }
}