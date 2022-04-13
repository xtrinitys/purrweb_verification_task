import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { List } from "./entities/list.entity";
import { Repository } from "typeorm";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { IBaseService } from "../common/interfaces/base.service";

@Injectable()
export class ListsService implements IBaseService<List, CreateListDto, UpdateListDto> {
  constructor(
    @InjectRepository(List) private readonly listsRepository: Repository<List>
  ) {}

  async getUserLists(authorId: string): Promise<List[]> {
    return await this.listsRepository.find({ where: { author: authorId } });
  }

  async createOne(entityDto: CreateListDto, authorId: string): Promise<List> {
    return await this.listsRepository.save({
      ...entityDto,
      author: authorId
    });
  }

  async deleteOne(id: string) {
    return await this.listsRepository.delete(id);
  }

  async getOne(id: string): Promise<List> {
    return await this.listsRepository.findOne(id);
  }

  async updateOne(id: string, entityDto: UpdateListDto): Promise<List> {
    return await this.listsRepository.save({
      id: id,
      ...entityDto
    });
  }
}
