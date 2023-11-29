import { Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./group.model";
import { Discipline } from "src/discipline/discipline.model";
import { GroupDiscipline } from "./group-discipline.model";

@Module({
	controllers: [GroupController],
	providers: [GroupService],
	imports: [SequelizeModule.forFeature([Group, Discipline, GroupDiscipline])],
})
export class GroupModule {}
