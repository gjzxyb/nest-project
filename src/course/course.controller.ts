import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  async create(@Body() course: Course): Promise<Course> {
    return this.courseService.create(course);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() course: Course,
  ): Promise<Course> {
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.courseService.delete(id);
  }
}
