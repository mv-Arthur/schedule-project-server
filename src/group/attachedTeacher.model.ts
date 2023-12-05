import { Column, DataType, Table, Model, HasMany, ForeignKey } from "sequelize-typescript";
import { Discipline } from "src/discipline/discipline.model";
import { Attached } from "./attached.model";
interface TeacherCreationAttrs {
	name: string;
	surname: string;
	patronimyc: string;
	attachedId?: number;
}
@Table({ tableName: "AttachedTeacher" })
export class AttachedTeacher extends Model<AttachedTeacher, TeacherCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;
	@Column({ type: DataType.STRING, allowNull: false })
	name: string;
	@Column({ type: DataType.STRING, allowNull: false })
	surname: string;
	@Column({ type: DataType.STRING, allowNull: false })
	patronimyc: string;
	@ForeignKey(() => Attached)
	@Column({ type: DataType.INTEGER })
	attachedId: number;
}
