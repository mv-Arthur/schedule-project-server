import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";

@Controller("group")
export class GroupController {
	constructor(private groupService: GroupService) {}

	@Post()
	createGroup(@Body() groupDto: CreateGroupDto) {
		return this.groupService.createGroup(groupDto);
	}

	@Get()
	getAllGroup() {
		return this.groupService.getAllGroups();
	}

	@Delete("/:id")
	deleteGroup(@Param("id") id: number) {
		return this.groupService.deleteGroup(id);
	}

	@Put("/:id")
	editGroup(@Param("id") id: number, groupDto: CreateGroupDto) {
		return this.groupService.updateGroup(groupDto, id);
	}
}
