import { Controller, Get, ParseUUIDPipe, Post } from '@nestjs/common';
import { Body, Param, Patch } from '@nestjs/common/decorators';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StudentService } from './student.service';
import {
  CreateStudentDto,
  UpdateStudentDto,
  FindStudentResponseDto,
  StudentResponseDto,
} from './dto/student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}
  @Get()
  getStudents(): FindStudentResponseDto[] {
    return this.StudentService.getStudents();
  }

  @Get('/:studentId')
  getStudentById(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): FindStudentResponseDto {
    return this.StudentService.getStudentById(studentId);
  }

  @Post()
  createStudent(@Body() body: CreateStudentDto): StudentResponseDto {
    console.log(body);
    return this.StudentService.createStudent(body);
  }

  @Patch('/:studentId')
  updateStudent(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @Body() body: UpdateStudentDto,
  ): StudentResponseDto {
    return this.StudentService.updateStudent(body, studentId);
  }
}
