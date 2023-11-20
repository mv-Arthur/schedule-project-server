import { Injectable } from "@nestjs/common";
import { Teacher } from "./teacher.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher-dto";

@Injectable()
export class TeacherService {
	constructor(@InjectModel(Teacher) private teacherRepository: typeof Teacher) {}

	async createTeacher(dto: CreateTeacherDto) {
		const teacher = await this.teacherRepository.create(dto);
		return teacher;
	}

	async getAllTeachers() {
		const teachers = await this.teacherRepository.findAll();
		return teachers;
	}

	async getOneTeacher(id: number) {
		const teacher = await this.teacherRepository.findByPk(id, { include: { all: true } });
		return teacher;
	}

	async deleteTeacher(id: number) {
		const deletedTeacher = await this.teacherRepository.destroy({
			where: {
				id: id,
			},
		});
		return deletedTeacher;
	}

	async updateTeacher(dto: UpdateTeacherDto, id: number) {
		const updatedTeacher = await this.teacherRepository.update(dto, {
			where: {
				id: id,
			},
		});

		return updatedTeacher;
	}
}
