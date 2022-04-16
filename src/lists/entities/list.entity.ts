import { BaseEntity } from "../../common/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../../cards/entities/card.entity";

@Entity('lists')
export class List extends BaseEntity {
  @ApiProperty({example: 'Todo list', description: 'List name'})
  @Column({type: 'varchar', length: 50})
  name: string;

  @ApiProperty({example: '1f943f0f-b15d-4c36-9aaf-02456f3251d6'})
  @ManyToOne(() => User, (user) => user.columns)
  author: User['id'];

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];
}