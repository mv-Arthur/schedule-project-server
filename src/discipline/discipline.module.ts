import { Module } from "@nestjs/common";
import { DisciplineController } from "./discipline.controller";
import { DisciplineService } from "./discipline.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Discipline } from "./discipline.model";
import { Teacher } from "src/teacher/teacher.model";

@Module({
	controllers: [DisciplineController],
	providers: [DisciplineService],
	imports: [SequelizeModule.forFeature([Discipline, Teacher])],
})
export class DisciplineModule {}
