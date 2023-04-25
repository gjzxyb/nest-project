import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Enrollment } from './enrollment.entity'
import { EnrollmentDto } from '../dto/enrollment.dto'
import { Course } from '../course/course.entity'
import { User } from '../user/user.entity'

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // 根据用户 ID 获取选课记录
  async findEnrollmentsByUserId(userId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { userId } });
  }

  // 根据课程 ID 获取选课记录
  async findEnrollmentsByCourseId(courseId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ where: { courseId } });
  }

  // 创建选课记录
  async createEnrollment(enrollmentDto: EnrollmentDto): Promise<Enrollment> {
    const course = await this.courseRepository.findOne({ where: { id: enrollmentDto.courseId } })
    const user = await this.userRepository.findOne({ where: { id: enrollmentDto.userId } })

    if (!course || !user) {
      throw new Error('Invalid course or user ID')
    }

    const enrollment = new Enrollment()
    enrollment.userId = enrollmentDto.userId
    enrollment.courseId = enrollmentDto.courseId
    return this.enrollmentRepository.save(enrollment)
  }

  // 获取所有的选课记录
  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find()
  }

  // 根据 ID 获取单个选课记录
  async findOneEnrollment(id: number): Promise<Enrollment> {
    return this.enrollmentRepository.findOne({ where: { id } })
  }

  // 删除选课记录
  async deleteEnrollment(id: number): Promise<void> {
    await this.enrollmentRepository.delete(id)
  }
}
