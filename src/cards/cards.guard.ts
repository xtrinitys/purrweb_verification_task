import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Repository } from "typeorm";
import { List } from "../lists/entities/list.entity";

@Injectable()
export class CardsGuard implements CanActivate {
  constructor(
    @InjectRepository(Card) private readonly cardsRepository: Repository<Card>,
    @InjectRepository(List) private readonly listsRepository: Repository<List>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const cardId = req.params.id;
    const listId = req.params.listId;

    await this.listsRepository.findOneOrFail({
      id: listId,
      author: userId
    })

    if (cardId) {
      await this.cardsRepository.findOneOrFail({
        id: cardId,
        list: listId
      });
    }

    return true;
  }
}