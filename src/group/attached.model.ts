import { Column, DataType, Table, Model, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import { Discipline } from "src/discipline/discipline.model";
import { Teacher } from "src/teacher/teacher.model";
import { Group } from "./group.model";
import { AttachedTeacher } from "./attachedTeacher.model";
import { AttachedDiscipline } from "./attachedDiscipline.model";

interface attachedDisciplineCreationAttrs {
	groupId: number;
}

@Table({ tableName: "attached", timestamps: false })
export class Attached extends Model<Attached, attachedDisciplineCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;
	@HasOne(() => AttachedDiscipline, { onDelete: "CASCADE" })
	discipline: AttachedDiscipline;
	@HasOne(() => AttachedTeacher, { onDelete: "CASCADE" })
	teacher: AttachedTeacher;

	@ForeignKey(() => Group)
	@Column({ type: DataType.INTEGER })
	groupId: number;
}
