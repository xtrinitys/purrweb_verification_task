import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { CardsGuard } from "./cards.guard";
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
import { Card } from "./entities/card.entity";

@ApiTags('cards')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiBadRequestResponse({ description: 'Bad request' })
@UseGuards(CardsGuard)
@Controller('lists/:listId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create card' })
  @ApiCreatedResponse({ description: 'Card created', type: Card })
  createCard(@Body() cardDto: CreateCardDto, @Param('listId', ParseUUIDPipe) listId: string) {
    return this.cardsService.createOne(cardDto, listId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards from the list' })
  @ApiOkResponse({ type: Card, isArray: true })
  getAllListCards(@Param('listId', ParseUUIDPipe) listId: string) {
   return this.cardsService.getAllFromList(listId);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get card' })
  @ApiOkResponse({ type: Card })
  getCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.getOne(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update card' })
  @ApiOkResponse({ type: Card })
  updateCard(@Param('id', ParseUUIDPipe) id: string, @Body() cardDto: UpdateCardDto) {
    return this.cardsService.updateOne(id, cardDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete card' })
  @ApiOkResponse({description: 'Deleted'})
  deleteCard(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardsService.deleteOne(id);
  }
}
