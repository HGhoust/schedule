import type { IScheduleList, ISubject, ITeacherList, IUser } from '@/types/date'

export interface IState {
	filters: {
		groupName: string
		teacher: string
		groupWeek: number
	}
	newTime: Date
	subjects: ISubject[] | []
	schedules: IScheduleList[]
	teachers: ITeacherList[] | []
	users: IUser[] | []
	user: IUser | null
	uniqueId: string
	isLoading: boolean
}
