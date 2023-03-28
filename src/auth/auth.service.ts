// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(user: User): Promise<User> {
    return this.userService.register(user)
  }

  async login(username: string, password: string): Promise<{ access_token: string } | null> {
    return this.userService.login(username, password)
  }
}
