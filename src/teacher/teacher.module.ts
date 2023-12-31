import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Teacher } from "./teacher.model";
import { Discipline } from "src/discipline/discipline.model";
import { DisciplineModule } from "src/discipline/discipline.module";

import { Group } from "src/group/group.model";

@Module({
	controllers: [TeacherController],
	providers: [TeacherService],
	imports: [SequelizeModule.forFeature([Teacher, Discipline, Group])],
	exports: [TeacherService],
})
export class TeacherModule {}
