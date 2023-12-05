import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Discipline } from "./discipline.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDisciplineDto } from "./dto/create-discipline.dtp";
import { Teacher } from "src/teacher/teacher.model";

@Injectable()
export class DisciplineService {
	constructor(
		@InjectModel(Discipline) private disciplineRepository: typeof Discipline,
		@InjectModel(Teacher) private teacherRepository: typeof Teacher
	) {}

	async createDisciplineForTeacher(teacherId: number, dto: CreateDisciplineDto) {
		const exstendedDto = { ...dto, allHours: dto.hoursQtyFirstSemester + dto.hoursQtySecondSemester };
		const teacher = await this.teacherRepository.findByPk(teacherId);
		if (!teacher) {
			throw new Error("учитель на найден");
		}

		const discipline = await this.disciplineRepository.create({
			...exstendedDto,
			teacherId: teacher.id,
		});
		return discipline;
	}

	async getDisciplineById(id: number) {
		return await this.disciplineRepository.findOne({
			where: {
				id,
			},
		});
	}

	async getAllDisciplinesTeacher(teacherId: number) {
		const disciplines = await this.disciplineRepository.findAll({
			where: {
				teacherId: teacherId,
			},
		});
		return disciplines;
	}

	async deleteDiscipline(id: number) {
		const deletedDiscipline = await this.disciplineRepository.destroy({
			where: {
				id: id,
			},
		});
		return deletedDiscipline;
	}

	async updateDiscipline(dto: CreateDisciplineDto, id: number) {
		const exstendedDto = { ...dto, allHours: dto.hoursQtyFirstSemester + dto.hoursQtySecondSemester };
		if (!exstendedDto.name) {
			throw new HttpException("название дисциплины не может быть пустым", HttpStatus.BAD_REQUEST);
		}
		const updatedTeacher = await this.disciplineRepository.update(exstendedDto, {
			where: {
				id: id,
			},
		});
		return updatedTeacher;
	}
}
