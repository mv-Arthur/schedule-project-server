import { Column, DataType, Table, Model, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Attached } from "src/group/attached.model";
interface DisciplineCreationAttrs {
	name: string;
	hoursQtyFirstSemester: number;
	hoursQtySecondSemester: number;
	weeklyLoadSecondWeek: number;
	weeklyLoadFirstWeek: number;
	allHours: number;
	attachedId?: number;
}
@Table({ tableName: "AttachedDiscipline", timestamps: false })
export class AttachedDiscipline extends Model<AttachedDiscipline, DisciplineCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;
	@Column({ type: DataType.INTEGER, allowNull: false })
	hoursQtyFirstSemester: number;
	@Column({ type: DataType.INTEGER, allowNull: false })
	hoursQtySecondSemester: number;
	@Column({ type: DataType.INTEGER, allowNull: false })
	weeklyLoadSecondWeek: number;
	@Column({ type: DataType.INTEGER, allowNull: false })
	weeklyLoadFirstWeek: number;
	@Column({ type: DataType.INTEGER, allowNull: false })
	allHours: number;

	@ForeignKey(() => Attached)
	@Column({ type: DataType.INTEGER })
	attachedId: number;
}
