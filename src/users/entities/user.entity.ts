import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { List } from "../../lists/entities/list.entity";

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  @OneToMany(() => List, (list) => list.author)
  columns: List[]
}
