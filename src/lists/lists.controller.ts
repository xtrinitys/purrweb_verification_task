import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { ListsService } from "./lists.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('lists')
@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  createOne(@Body() listDto: CreateListDto) {

  }

  @Get('/:id')
  getOne(@Param('id') id: string) {

  }

  @Patch('/:id')
  updateOne(@Param('id') id: string) {

  }

  @Get('/:id/cards')
  getCardsInTheList(@Param('id') id: string) {

  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {

  }
}