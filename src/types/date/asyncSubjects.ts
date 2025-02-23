export interface ITeacherList {
	teacher: string
	name: string
	id: string
	key: string
}

export interface IUser {
	role: string
	createdAt: number
	name: string
	email: string
	uId: string
	gender: string
	password: string
	group: string
}

export interface IScheduleListHour {
	group: string
	room: string
	time: number
	timeStart: string
	timeEnd: string
	hourId: string
}

export interface IDays {
	id: number
	day: string
}

export interface IScheduleList {
	day: IDays[]
	dayCount: number
	hours: IScheduleListHour[]
	id: string
	dayId: string
	location: string
	type: string
	week: number
	key?: string
}
