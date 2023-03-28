import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { UserController } from '../user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // 使用一个安全的密钥
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class AuthModule {}
