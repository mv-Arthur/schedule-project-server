import { Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "./teacher.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Teacher } from "./teacher.model";

@Module({
	controllers: [TeacherController],
	providers: [TeacherService],
	imports: [SequelizeModule.forFeature([Teacher])],
})
export class TeacherModule {}
