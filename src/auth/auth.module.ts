import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { UserController } from '../user/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/user.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      })
    })
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class AuthModule {}
