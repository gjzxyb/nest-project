import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class EnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  courseId: number;
}
