// user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserResponse } from './user-response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: User): UserResponse {
    return this.userService.register(user);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string): UserResponse | null {
    return this.userService.login(username, password);
  }
}
