export interface IHour {
	room: string
	time: number
	group: string
	timeStart?: number
	timeEnd?: number
	dateStart?: Date
	dateEnd?: Date
}

export interface ISchedule {
	type: string
	location: string
	day: number[]
	week: number | ''
	hour?: IHour
	hours: IHour[]
	idx?: string
}

export interface ISubject {
	name: string
	teacher: string
	schedule?: ISchedule
	schedules: ISchedule[]
}
