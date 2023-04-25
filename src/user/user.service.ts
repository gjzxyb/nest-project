import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User | undefined> {
    return await this.userRepository.findAll();
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({where:{id}});
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.userRepository.findOne({where:{id}});

    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOne({where:{id}});

    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }

    await this.userRepository.delete(id);
  }
}
