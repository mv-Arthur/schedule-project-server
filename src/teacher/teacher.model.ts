import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Discipline } from "src/discipline/discipline.model";

interface TeacherCreationAttrs {
	name: string;
	surname: string;
	patronimyc: string;
}

@Table({ tableName: "teachers" })
export class Teacher extends Model<Teacher, TeacherCreationAttrs> {
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
	@HasMany(() => Discipline, { onDelete: "CASCADE" })
	disciplines: Discipline[];
}
