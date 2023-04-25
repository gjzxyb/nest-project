import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { CreateUserDto } from 'src/dto/create-user.dto'

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string
  ) {
    const createUserDto = new CreateUserDto()
    createUserDto.email = email
    createUserDto.password = password
    createUserDto.role = role

    return this.userService.create(createUserDto)
  }

  @Get()
  @Roles('admin')
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @Roles('admin', 'user')
  async findById(@Param('id') id: number, @Req() req) {
    if (req.user.role === 'user' && req.user.id !== id) {
      return { message: 'Unauthorized' }
    }
    return this.userService.findById(id)
  }
}
