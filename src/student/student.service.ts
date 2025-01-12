import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { students } from '../db';
import {
  FindStudentResponseDto,
  CreateStudentDto,
  UpdateStudentDto,
  StudentResponseDto,
} from './dto/student.dto';

@Injectable()
export class StudentService {
  private students = students;

  getStudents(): FindStudentResponseDto[] {
    return this.students;
  }

  getStudentById(id: string): FindStudentResponseDto {
    return this.students.find((student) => {
      return student.id === id;
    });
  }

  createStudent(payload: CreateStudentDto): FindStudentResponseDto {
    const newStudent = {
      id: randomUUID(),
      ...payload,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  updateStudent(payload: UpdateStudentDto, id: string): FindStudentResponseDto {
    let updatedStudent: StudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === id) {
        updatedStudent = {
          id,
          name: payload.name ?? student.name, // if payload.name is undefined, use student.name
          teacher: payload.teacher ?? student.teacher,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }

  getStudentsByTeacherId(teacherId: string): FindStudentResponseDto[] {
    return this.students.filter((student) => student.teacher === teacherId);
  }

  updateStudentTeacher(
    teacherId: string,
    studentId: string,
  ): FindStudentResponseDto {
    let updatedStudent: FindStudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updatedStudent = {
          ...student,
          teacher: teacherId,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
}
