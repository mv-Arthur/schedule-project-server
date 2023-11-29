import { Column, DataType, Table, Model, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Discipline } from "src/discipline/discipline.model";
import { Group } from "./group.model";

@Table({ tableName: "group_discipline", createdAt: false, updatedAt: false })
export class GroupDiscipline extends Model<GroupDiscipline> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;
	@ForeignKey(() => Group)
	@Column({ type: DataType.INTEGER })
	groupId: number;
	@ForeignKey(() => Discipline)
	@Column({ type: DataType.INTEGER })
	disciplineId: number;
}
