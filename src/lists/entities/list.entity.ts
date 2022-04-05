import { BaseEntity } from "../../common/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('lists')
export class List extends BaseEntity {
  @ApiProperty({example: 'Todo list', description: 'List name'})
  @Column({type: 'varchar', length: 50})
  name: string;

  @ApiProperty({type: () => User})
  @ManyToOne(() => User, (user) => user.columns)
  author: User;
}