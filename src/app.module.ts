// src/app.module.ts

import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'on4kQKwQlDKKffpU',
      database: 'lsmzpj_cn',
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ]
})
export class AppModule {}
