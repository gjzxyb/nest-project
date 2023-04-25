import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id } });

  }

  async create(course: Course): Promise<Course> {
    return this.courseRepository.save(course);
  }

  async update(id: number, course: Course): Promise<Course> {
    const existingCourse = await this.courseRepository.findOne({ where: { id } });
    if (!existingCourse) {
      return null;
    }
    return this.courseRepository.save({ ...existingCourse, ...course });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.courseRepository.delete(id);
    return result.affected > 0;
  }
}
