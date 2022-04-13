import { Injectable } from "@nestjs/common";
import { IBaseService } from "../common/interfaces/base.service";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CardsService implements IBaseService<Card, CreateCardDto, UpdateCardDto>{
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>
  ) {}

  async createOne(entityDto: CreateCardDto, listId: string): Promise<Card> {
    return await this.cardRepository.save({
      ...entityDto,
      list: listId
    });
  }

  async deleteOne(id: string) {
    return await this.cardRepository.delete(id);
  }

  async getOne(id: string): Promise<Card> {
    return await this.cardRepository.findOne(id);
  }

  async updateOne(id: string, entityDto: UpdateCardDto): Promise<Card> {
    return await this.cardRepository.save({
      ...entityDto,
      id: id
    });
  }

  async getAllFromList(listId: string): Promise<Card[]> {
    return await this.cardRepository.find({ where: { list: listId } })
  }
}
