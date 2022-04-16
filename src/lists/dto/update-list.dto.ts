import { CreateListDto } from "./create-list.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateListDto extends PartialType(CreateListDto) {}