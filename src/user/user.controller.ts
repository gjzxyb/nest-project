import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id)
  }

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedUser: Partial<User>): Promise<User> {
    return this.userService.update(id, updatedUser)
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id)
  }
}
