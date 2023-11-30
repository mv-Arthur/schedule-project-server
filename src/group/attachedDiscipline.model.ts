import { Column, DataType, Table, Model, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import { Discipline } from "src/discipline/discipline.model";
import { Teacher } from "src/teacher/teacher.model";
import { Group } from "./group.model";

interface attachedDisciplineCreationAttrs {
	groupId: number;
}

@Table({ tableName: "attachedDisciplines", timestamps: false })
export class AttachedDiscipline extends Model<AttachedDiscipline, attachedDisciplineCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;
	@HasOne(() => Discipline)
	discipline: Discipline;
	@HasOne(() => Teacher)
	teacher: Teacher;

	@ForeignKey(() => Group)
	@Column({ type: DataType.INTEGER })
	groupId: number;
}
