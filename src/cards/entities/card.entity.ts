import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { List } from "../../lists/entities/list.entity";

@Entity('cards')
export class Card extends BaseEntity {
  @Column('varchar', {length: 50})
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => List, (list) => list.cards)
  list: List['id'];
}