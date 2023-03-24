// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  register(user: User): User {
    user.id = Date.now();
    this.users.push(user);
    return user;
  }

  login(username: string, password: string): { access_token: string } | null {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      return null;
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }
}