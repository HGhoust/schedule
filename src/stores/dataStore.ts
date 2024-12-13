import { getWeekNumber } from '@/composables'
import { hours, subjectsChgu } from '@/data/data'
import { defineStore } from 'pinia'

import type { IHour, IHourLection, ISubject } from '@/types/date'
import type { IState } from '@/types/store'

export const useDataStore = defineStore('dataStore', {
	state: (): IState => ({
		filters: {
			groupName: '',
			teacher: '',
			groupWeek: getWeekNumber(new Date()),
		},
		newTime: new Date(),
	}),

	actions: {
		getDayHours(
			this: IState & { filteredSubjects: ISubject[] },
			idx: number,
			groupWeek: number = this.filters.groupWeek,
			groupName: string = this.filters.groupName,
			teacher: string = this.filters.teacher
		) {
			const currentDate = new Date()

			return hours.map((hourItem: IHourLection) => {
				const subject = this.filteredSubjects.reduce(
					(acc, subject: ISubject) => {
						const shadule = subject.shadules.reduce((acc, shadule) => {
							const isCorrectDay = shadule.day.includes(idx)
							const isCorrectWeek = !shadule.week || shadule.week === groupWeek
							const hour = shadule.hours.reduce((acc, sheduleHour: IHour) => {
								const isGroupMatch =
									sheduleHour.group === groupName ||
									(teacher &&
										(!sheduleHour.dateStart ||
											!sheduleHour.dateEnd ||
											(sheduleHour.dateStart <= currentDate &&
												sheduleHour.dateEnd > currentDate)))

								if (!acc && sheduleHour.time === hourItem.hour && isGroupMatch)
									return sheduleHour
								return acc
							}, null)

							if (isCorrectDay && isCorrectWeek && hour && !acc)
								return { ...shadule, hour }
							return acc
						}, null)

						if (shadule && !acc) return { ...subject, shadule }
						return acc
					},
					null
				)

				return {
					...hourItem,
					positionHour: `${hourItem.hour - 1}-${hourItem.hour}`,
					subject,
				}
			})
		},
	},

	getters: {
		filteredSubjects: (state: IState): ISubject[] => {
			const { groupName, teacher, groupWeek } = state.filters

			return subjectsChgu.filter((subject: ISubject) => {
				const matchesTeacher =
					!teacher ||
					subject.teacher.toLowerCase().includes(teacher.toLowerCase())
				const matchesWeek =
					!groupWeek ||
					subject.shadules.some(shadule => shadule.week === groupWeek)
				const matchesGroupName =
					!groupName ||
					subject.shadules.some(shadule =>
						shadule.hours.some(h => h.group === groupName)
					)

				return matchesTeacher && matchesWeek && matchesGroupName
			})
		},
	},
})
