import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user/user.service'
import { User } from './user/user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() user: User): User {
    return this.userService.register(user)
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string): User | null {
    return this.userService.login(username, password)
  }
}
