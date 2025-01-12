import { Controller, Get, ParseUUIDPipe } from '@nestjs/common';
import { Param, Patch } from '@nestjs/common/decorators';
import { FindStudentResponseDto } from './../student/dto/student.dto';
import { StudentService } from './../student/student.service';

@Controller('teachers/:teacherId/students')
export class StudentTeacherController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  getStudents(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ): FindStudentResponseDto[] {
    return this.studentService.getStudentsByTeacherId(teacherId);
  }

  @Patch('/:teacherId')
  updateTeacher(
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
  ): FindStudentResponseDto {
    return this.studentService.updateStudentTeacher(teacherId, studentId);
  }
}
