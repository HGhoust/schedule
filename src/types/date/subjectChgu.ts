export interface IHour {
	room: string
	time: number
	group: string
	timeStart: Date | number
	timeEnd: Date | number
	dateStart?: Date
	dateEnd?: Date | string
}

interface IShadule {
	type: string
	day: number[]
	week: number | ''
	hours: IHour[]
}

export interface ISubject {
	name: string
	teacher: string
	location: string
	shadules: IShadule[]
}

export type TypeSubjects = ISubject[]
