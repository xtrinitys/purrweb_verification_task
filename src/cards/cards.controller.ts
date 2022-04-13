import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { CardsGuard } from "./cards.guard";

@UseGuards(CardsGuard)
@Controller('lists/:listId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  createCard(@Body() cardDto: CreateCardDto, @Param('listId', ParseUUIDPipe) listId: string) {
    return this.cardsService.createOne(cardDto, listId);
  }

  @Get()
  getAllListCards(@Param('listId', ParseUUIDPipe) listId: string) {
   return this.cardsService.getAllFromList(listId);
  }

  @Get('/:id')
  getCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.getOne(id);
  }

  @Patch('/:id')
  updateCard(@Param('id', ParseUUIDPipe) id: string, @Body() cardDto: UpdateCardDto) {
    return this.cardsService.updateOne(id, cardDto);
  }

  @Delete('/:id')
  deleteCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.deleteOne(id);
  }
}
