import { Module } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CardsController } from "./cards.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { List } from "../lists/entities/list.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, List])
  ],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
