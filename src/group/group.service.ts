import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Group } from "./group.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Attached } from "./attached.model";
import { AddTeacherAndDisciplineDto } from "./dto/add-teacher-and-discipline.dto";
import { Teacher } from "src/teacher/teacher.model";
import { Discipline } from "src/discipline/discipline.model";
import { AttachedDiscipline } from "./attachedDiscipline.model";
import { AttachedTeacher } from "./attachedTeacher.model";

@Injectable()
export class GroupService {
	constructor(
		@InjectModel(Group) private groupRepository: typeof Group,
		@InjectModel(Attached) private attachedRepository: typeof Attached,
		@InjectModel(AttachedDiscipline) private attachedDisciplineRepository: typeof AttachedDiscipline,
		@InjectModel(AttachedTeacher) private attachedTeacherRepository: typeof AttachedTeacher,
		@InjectModel(Teacher) private teacherRepository: typeof Teacher,
		@InjectModel(Discipline) private disciplineRepository: typeof Discipline
	) {}

	async createGroup(dto: CreateGroupDto) {
		const group = await this.groupRepository.create(dto);
		return group;
	}

	async getGroupById(id: number) {
		const group = await this.groupRepository.findByPk(id, {
			include: {
				model: Attached,
				include: [AttachedDiscipline, AttachedTeacher],
			},
		});
		return group;
	}

	async getAllGroups() {
		const groups = await this.groupRepository.findAll({
			include: {
				model: Attached,
				include: [AttachedDiscipline, AttachedTeacher],
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

		delete teacher.dataValues.id;
		delete teacher.dataValues.createdAt;
		delete teacher.dataValues.updatedAt;

		delete discipline.dataValues.teacherId;
		delete discipline.dataValues.id;

		if (!teacher && !discipline) {
			throw new HttpException("дисциплина или преподаватель не найдены", HttpStatus.BAD_REQUEST);
		}

		const attached = await this.attachedRepository.create({ groupId: groupId });
		const attachedTeacher = await this.attachedTeacherRepository.create({ ...teacher.dataValues, attachedId: attached.id });
		const attachedDiscipline = await this.attachedDisciplineRepository.create({ ...discipline.dataValues, attachedId: attached.id });

		const group = await this.groupRepository.findByPk(groupId, {
			include: {
				model: Attached,
				include: [AttachedDiscipline, AttachedTeacher],
			},
		});
		return group;
	}
}
