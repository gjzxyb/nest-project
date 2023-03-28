import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'stuid' })
  id: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'kaojihao' })
  kaojihao: string

  @Column({ name: 'password' })
  password: string
}
