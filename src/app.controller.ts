import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user/user.service'
import { User } from './user/user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.userService.register(user)
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ): Promise<{ access_token: string } | null> {
    return await this.userService.login(username, password)
  }
}
