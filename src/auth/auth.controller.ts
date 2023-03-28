import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<{ access_token: string } | null> {
    return await this.authService.login(username, password);
  }
}
