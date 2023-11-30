import { Module } from "@nestjs/common";
import { DisciplineController } from "./discipline.controller";
import { DisciplineService } from "./discipline.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Discipline } from "./discipline.model";
import { Teacher } from "src/teacher/teacher.model";
import { Group } from "src/group/group.model";
import { AttachedDiscipline } from "src/group/attachedDiscipline.model";

@Module({
	controllers: [DisciplineController],
	providers: [DisciplineService],
	imports: [SequelizeModule.forFeature([Discipline, Teacher, AttachedDiscipline, Group])],
	exports: [DisciplineService],
})
export class DisciplineModule {}
