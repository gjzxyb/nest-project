// src/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: User): User {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string): { access_token: string } | null {
    return this.authService.login(username, password);
  }
}

