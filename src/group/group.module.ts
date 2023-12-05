import { Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "./group.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Group } from "./group.model";
import { Discipline } from "src/discipline/discipline.model";
import { Attached } from "./attached.model";
import { Teacher } from "src/teacher/teacher.model";
import { TeacherModule } from "src/teacher/teacher.module";
import { DisciplineModule } from "src/discipline/discipline.module";
import { AttachedTeacher } from "./attachedTeacher.model";
import { AttachedDiscipline } from "./attachedDiscipline.model";

@Module({
	controllers: [GroupController],
	providers: [GroupService],
	imports: [SequelizeModule.forFeature([Group, Discipline, Attached, Teacher, AttachedTeacher, AttachedDiscipline]), TeacherModule, DisciplineModule],
})
export class GroupModule {}
