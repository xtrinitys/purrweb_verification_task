import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { User } from "../../users/entities/user.entity";
import { Card } from "../../cards/entities/card.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('comments')
export class Comment extends BaseEntity {
  @Column('varchar', { length: 100 })
  @ApiProperty()
  content: string;

  @ManyToOne(() => Card)
  @ApiProperty({ example: '12061561-77e4-4e27-ac3d-00ea7e937b05' })
  card: Card['id']

  @ManyToOne(() => User, (user) => user.comments)
  @ApiProperty({ example: '9175b7c8-9dbc-4cd5-a8cb-f2be0d697f14' })
  author: User['id'];
}