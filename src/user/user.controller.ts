// src/user/user.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: User): User {
    return this.userService.register(user);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string): { access_token: string } | null {
    return this.userService.login(username, password);
  }
}
