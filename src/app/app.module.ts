import { Module } from '@nestjs/common';
import { StudentModule } from './../student/student.module';
import { TeacherModule } from './../teacher/teacher.module';

@Module({
  imports: [TeacherModule, StudentModule],
})
export class AppModule {}
