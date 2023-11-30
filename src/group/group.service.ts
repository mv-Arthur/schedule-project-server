import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Group } from "./group.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AttachedDiscipline } from "./attachedDiscipline.model";
import { AddTeacherAndDisciplineDto } from "./dto/add-teacher-and-discipline.dto";
import { Teacher } from "src/teacher/teacher.model";
import { Discipline } from "src/discipline/discipline.model";

@Injectable()
export class GroupService {
	constructor(
		@InjectModel(Group) private groupRepository: typeof Group,
		@InjectModel(AttachedDiscipline) private AttachedDisciplineRepository: typeof AttachedDiscipline,
		@InjectModel(Discipline) private disciplineRepository: typeof Discipline,
		@InjectModel(Teacher) private teacherRepository: typeof Teacher
	) {}

	async createGroup(dto: CreateGroupDto) {
		const group = await this.groupRepository.create(dto);
		return group;
	}

	async getAllGroups() {
		const groups = await this.groupRepository.findAll({
			include: {
				model: AttachedDiscipline,
				include: [Discipline, Teacher],
			},
		});
		return groups;
	}

	async deleteGroup(id: number) {
		const deletedGroup = await this.groupRepository.destroy({
			where: {
				id: id,
			},
		});
		return deletedGroup;
	}

	async updateGroup(dto: CreateGroupDto, id: number) {
		const updatedGroup = await this.groupRepository.update(dto, {
			where: {
				id: id,
			},
		});
		return updatedGroup;
	}

	async testAddDisciplineToGroup(groupId: number, dto: AddTeacherAndDisciplineDto) {
		const teacher = await this.teacherRepository.findByPk(dto.teacherId);
		const discipline = await this.disciplineRepository.findByPk(dto.disciplineId);

		if (!teacher && !discipline) {
			throw new HttpException("дисциплина или преподаватель не найдены", HttpStatus.BAD_REQUEST);
		}

		const attachedDisciplineCreationObj = {
			groupId: Number(groupId),
		};

		const attachedDiscipline = await this.AttachedDisciplineRepository.create(attachedDisciplineCreationObj);
		await this.teacherRepository.update(
			{ ...teacher, attachedDisciplineId: attachedDiscipline.id },
			{
				where: {
					id: teacher.id,
				},
			}
		);
		await this.disciplineRepository.update(
			{ ...discipline, attachedDisciplineId: attachedDiscipline.id },
			{
				where: {
					id: discipline.id,
				},
			}
		);
		const founded = await this.AttachedDisciplineRepository.findAll({ include: { all: true } });
		return founded;
	}
}
