import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { List } from "../../lists/entities/list.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../../comments/entities/comment.entity";

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'user@test.com', description: 'email' })
  @Column('varchar', { length: 100, unique: true })
  email: string;

  @ApiProperty({ example: 'testpassword', description: 'password' })
  @Column('varchar', { length: 100 })
  password: string;

  @ApiProperty({type: () => [List]})
  @OneToMany(() => List, (list) => list.author)
  columns: List[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
