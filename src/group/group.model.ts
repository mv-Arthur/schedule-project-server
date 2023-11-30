import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { AttachedDiscipline } from "./attachedDiscipline.model";

interface GroupCreationAttrs {
	groupNumber: string;
	numberOfCourse: number;
	nameOfSpec: string;
}

@Table({ tableName: "group", timestamps: false })
export class Group extends Model<Group, GroupCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;
	@Column({ type: DataType.STRING, allowNull: false })
	groupNumber: string;
	@Column({ type: DataType.INTEGER, allowNull: false })
	numberOfCourse: number;
	@Column({ type: DataType.STRING, allowNull: false })
	nameOfSpec: string;
	@HasMany(() => AttachedDiscipline, { onDelete: "CASCADE" })
	disciplines: AttachedDiscipline[];
}
