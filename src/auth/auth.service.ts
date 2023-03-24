// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(user: User): User {
    return this.userService.register(user);
  }

  login(username: string, password: string): { access_token: string } | null {
    return this.userService.login(username, password);
  }
}
