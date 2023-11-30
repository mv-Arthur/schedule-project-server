import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { TeacherModule } from "./teacher/teacher.module";
import { Teacher } from "./teacher/teacher.model";
import { DisciplineModule } from "./discipline/discipline.module";
import { Discipline } from "./discipline/discipline.model";
import { GroupModule } from "./group/group.module";
import { Group } from "./group/group.model";
import { AttachedDiscipline } from "./group/attachedDiscipline.model";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		SequelizeModule.forRoot({
			dialect: "postgres",
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_NAME,
			models: [Teacher, Discipline, Group, AttachedDiscipline],
			autoLoadModels: true,
		}),
		TeacherModule,
		DisciplineModule,
		GroupModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
