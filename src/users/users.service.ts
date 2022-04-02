import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  //TODO: Exception handling

  async createUser(userDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(userDto);
  }

  async getByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
