import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { JwtStrategy } from './jwt.strategy'
import { UserController } from '../user/user.controller'
import { JwtConfigService } from './jwt-config.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [JwtConfigService],
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.jwtSecret,
        signOptions: { expiresIn: '1h' }
      })
    })
  ],
  providers: [UserService, JwtStrategy, JwtConfigService],
  controllers: [UserController]
})
export class AuthModule {}
