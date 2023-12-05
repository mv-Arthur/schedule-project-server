import { Column, DataType, Table, Model, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";

import { Teacher } from "src/teacher/teacher.model";

interface DisciplineCreationAttrs {
	name: string;
	hoursQtyFirstSemester: number;
	hoursQtySecondSemester: number;
	weeklyLoadSecondWeek: number;
	weeklyLoadFirstWeek: number;
	allHours: number;
	teacherId?: number;
}

@Table({ tableName: "discipline", timestamps: false })
export class Discipline extends Model<Discipline, DisciplineCreationAttrs> {
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

	@ForeignKey(() => Teacher)
	@Column({ type: DataType.INTEGER })
	teacherId: number;
}
