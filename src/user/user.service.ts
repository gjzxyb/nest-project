import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } })
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user)
  }

  async update(id: number, updatedUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updatedUser)
    return this.userRepository.findOneOrFail({ where: { id } })
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }
  async register(user: User): Promise<User> {
    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }
  async login(username: string, password: string): Promise<{ access_token: string } | null> {
    const user = await this.userRepository.findOne({ where: { name: username } })

    // 这里我们假设 User 实体包含一个名为 'password' 的属性
    // 实际上，您可能需要将密码存储为哈希值，并在此处进行哈希比较
    if (user && user.password === password) {
      // 根据您的身份验证策略生成 access_token，例如，使用 JWT
      const access_token = 'adminiiiiiii' // 用实际的 JWT token 替换
      return { access_token }
    } else {
      return null
    }
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } })
  }
}
