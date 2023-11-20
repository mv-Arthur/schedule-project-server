export class CreateDisciplineDto {
	readonly name: string;
	readonly hoursQtyFirstSemester: number;
	readonly hoursQtySecondSemester: number;
	readonly weeklyLoadSecondWeek: number;
	readonly weeklyLoadFirstWeek: number;
}
