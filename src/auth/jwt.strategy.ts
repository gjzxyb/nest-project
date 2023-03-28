// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'admin-secret'
    })
  }

  async validate(payload: { sub: number; username: string }): Promise<any> {
    const user = await this.userService.findById(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
