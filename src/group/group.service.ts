import { Injectable } from "@nestjs/common";
import { Group } from "./group.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateGroupDto } from "./dto/create-group.dto";

@Injectable()
export class GroupService {
	constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

	async createGroup(dto: CreateGroupDto) {
		const group = await this.groupRepository.create(dto);
		return group;
	}

	async getAllGroups() {
		const groups = await this.groupRepository.findAll();
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
}
