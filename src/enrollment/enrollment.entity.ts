// enrollment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from '../course/course.entity';
import { User } from '../user/user.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  courseId: number;

  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  course: Course;

  constructor(userId?: number, courseId?: number) {
    this.userId = userId;
    this.courseId = courseId;
  }
}

