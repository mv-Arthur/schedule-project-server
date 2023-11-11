import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { TeacherService } from "./teacher.service";
import { UpdateTeacherDto } from "./dto/update-teacher-dto";

@Controller("teacher")
export class TeacherController {
	constructor(private teacherService: TeacherService) {}

	@Post()
	createTeacher(@Body() teacherDto: CreateTeacherDto) {
		return this.teacherService.createTeacher(teacherDto);
	}

	@Get()
	getAllTeachers() {
		return this.teacherService.getAllTeachers();
	}

	@Delete("/:id")
	deleteTeacher(@Param("id") id: number) {
		return this.teacherService.deleteTeacher(id);
	}

	@Put("/:id")
	updateTeacher(@Param("id") id: number, @Body() teacherDto: UpdateTeacherDto) {
		return this.teacherService.updateTeacher(teacherDto, id);
	}
}
