import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { AuthModule } from '../auth/auth.module'
import { JwtConfigService } from '../auth/jwt-config.service'

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, JwtConfigService],
  controllers: [UserController],
  exports: [UserService, JwtConfigService]
})
export class UserModule {}
