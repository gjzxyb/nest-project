import { IsNotEmpty, IsInt, IsPositive } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  courseId: number;
}
