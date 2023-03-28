// src/app.module.ts

import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot()]
})
export class AppModule {}
