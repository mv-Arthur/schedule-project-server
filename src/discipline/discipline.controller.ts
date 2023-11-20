import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DisciplineService } from "./discipline.service";
import { CreateDisciplineDto } from "./dto/create-discipline.dtp";

@Controller("discipline")
export class DisciplineController {
	constructor(private disciplineService: DisciplineService) {}

	@Post("/:teacherId")
	createDisciplineForTeacher(@Param("teacherId") teacherId: number, @Body() disciplineData: CreateDisciplineDto) {
		return this.disciplineService.createDisciplineForTeacher(teacherId, disciplineData);
	}

	@Get("/:teacherId")
	getAllTeachers(@Param("teacherId") teacherId: number) {
		return this.disciplineService.getAllDisciplinesTeacher(teacherId);
	}

	@Delete("/:id")
	deleteTeacher(@Param("id") id: number) {
		return this.disciplineService.deleteDiscipline(id);
	}

	@Put("/:id")
	updateTeacher(@Param("id") id: number, @Body() CreateDisciplineDto: CreateDisciplineDto) {
		return this.disciplineService.updateDiscipline(CreateDisciplineDto, id);
	}
}
