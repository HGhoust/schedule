export interface IHour {
	room: string
	time: number
	group: string
	timeStart: number
	timeEnd: number
	dateStart?: Date
	dateEnd?: Date
}

export interface ISchedule {
	type: string
	day: number[]
	week: number | ''
	hour?: IHour
	hours: IHour[]
}

export interface ISubject {
	name: string
	teacher: string
	location: string
	schedule?: ISchedule
	schedules: ISchedule[]
}
