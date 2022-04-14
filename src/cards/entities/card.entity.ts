import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { List } from "../../lists/entities/list.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('cards')
export class Card extends BaseEntity {
  @Column('varchar', { length: 50 })
  @ApiProperty({ example: 'Some card title' })
  title: string;

  @Column('text')
  @ApiProperty({ example: 'Card content bla bla bla' })
  content: string;

  @ManyToOne(() => List, (list) => list.cards)
  @ApiProperty({ example: '8082176c-e5ff-49a5-8ffa-e8b4c0e5db78' })
  list: List['id'];
}