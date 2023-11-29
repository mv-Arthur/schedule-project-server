import { Column, DataType, Table, Model, BelongsToMany } from "sequelize-typescript";
import { Discipline } from "src/discipline/discipline.model";
import { GroupDiscipline } from "./group-discipline.model";

interface GroupCreationAttrs {
	groupNumber: string;
	numberOfCourse: number;
	nameOfSpec: string;
}

@Table({ tableName: "group" })
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

	@BelongsToMany(() => Discipline, () => GroupDiscipline)
	discipline: Discipline[];
}
