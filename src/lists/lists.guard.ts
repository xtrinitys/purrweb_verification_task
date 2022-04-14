import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { List } from "./entities/list.entity";
import { Repository } from "typeorm";

@Injectable()
export class ListsGuard implements CanActivate {
  constructor(@InjectRepository(List) private readonly listRepository: Repository<List>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const urlUserId = req.params.userId;
    const guardUserId = req.user.id;
    const userEquals = urlUserId === guardUserId;

    const listId = req.params.id;

    if (!userEquals) {
      return false;
    }

    if (listId) {
      await this.listRepository.findOneOrFail({
        where: {
          id: listId,
          author: guardUserId
        }
      });
    }

    return true;
  }
}