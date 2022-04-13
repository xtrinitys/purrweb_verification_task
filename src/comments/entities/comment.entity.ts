import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { User } from "../../users/entities/user.entity";
import { Card } from "../../cards/entities/card.entity";

@Entity()
export class Comment extends BaseEntity {
  @Column('varchar', { length: 100 })
  content: string;

  @ManyToOne(() => Card)
  card: Card['id']

  @ManyToOne(() => User)
  author: User['id'];
}