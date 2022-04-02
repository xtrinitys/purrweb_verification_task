import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 100 })
  password: string;
}
