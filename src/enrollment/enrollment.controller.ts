import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentService.findOne(id);
  }

  @Get('/user/:userId')
  async findEnrollmentsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.enrollmentService.findEnrollmentsByUserId(userId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentService.remove(id);
  }
}
