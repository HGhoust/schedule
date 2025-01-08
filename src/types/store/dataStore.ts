import type { ISubject } from '@/types/date'

export interface IState {
	filters: {
		groupName: string
		teacher: string
		groupWeek: number
	}
	newTime: Date
	subjects: ISubject[] | []
}
