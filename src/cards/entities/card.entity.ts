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
  @ApiProperty({ type: type => List })
  list: List['id'];
}