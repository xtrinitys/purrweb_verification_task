import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000'})
  id: string;

  @UpdateDateColumn()
  @ApiProperty({ example: '2011-10-05T14:48:00.000Z' })
  updatedAt: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2011-10-05T14:48:00.000Z' })
  createdAt: string;
}
