import type { IDays } from './asyncSubjects'

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
	day: [] | IDays[]
	week: number | ''
	hour?: IHour
	hours: IHour[]
	id?: string
}

export interface ISubject {
	name: string
	teacher: string
	schedule?: ISchedule
	schedules: ISchedule[]
	id?: string
}
