import { BaseEntity } from "../entities/base.entity";

export interface IBaseService<Entity extends BaseEntity, CreateEntityDto, UpdateEntityDto> {
  createOne(entityDto: CreateEntityDto, ...args: any[]): Promise<Entity>;
  getOne(id: string): Promise<Entity>;
  updateOne(id: string, entityDto: UpdateEntityDto): Promise<Entity>;
  deleteOne(id: string): any;
}