import { BaseEntity } from "../../common/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('lists')
export class List extends BaseEntity {
  @Column('varchar')
  name: string;

  @ManyToOne(() => User, (user) => user.columns)
  author: User;
}