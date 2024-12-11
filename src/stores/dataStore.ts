import { getCurrentWeek, getWeekNumber } from '@/composables'
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
		getDayFromIndex(idx: number) {
			return this.filteredHoursFromDay.find((_, id) => id === idx)
		},
	},

	getters: {
		filteredSubjects: (state: IState): ISubject[] => {
			return subjectsChgu.filter((subject: ISubject) => {
				const { groupName, teacher, groupWeek } = state.filters

				return (
					(!teacher ||
						subject.teacher.toLowerCase().includes(teacher.toLowerCase())) &&
					(!groupWeek ||
						subject.shadules.find(shadule => shadule.week === groupWeek)) &&
					(!groupName ||
						subject.shadules.find(shadule =>
							shadule.hours.find(h => h.group === groupName)
						))
				)
			})
		},

		filteredHoursFromDay(state: IState) {
			const { groupWeek, teacher, groupName } = state.filters
			const getFilteredSubjects: ISubject[] = this.filteredSubjects

			return getCurrentWeek().map((dayFromWeek, idxDay) => {
				return {
					...dayFromWeek,
					idxDay,
					subjects: hours.map((hourItem: IHourLection) => {
						return {
							...hourItem,
							positionHour: `${hourItem.hour - 1}-${hourItem.hour}`,
							subject: getFilteredSubjects.find((subjectArray: ISubject) =>
								subjectArray.shadules.find(
									shadule =>
										(shadule.day === idxDay ||
											(Array.isArray(shadule.day) &&
												shadule.day.includes(idxDay))) &&
										(shadule.week === groupWeek || shadule.week === '') &&
										shadule.hours.some(
											(sheduleHour: IHour) =>
												sheduleHour.time === hourItem.hour &&
												(teacher
													? true
													: sheduleHour.group === groupName &&
													  (sheduleHour.dateEnd === '' ||
															sheduleHour.dateStart === undefined ||
															sheduleHour.dateEnd === undefined ||
															(sheduleHour.dateStart <= new Date() &&
																sheduleHour.dateEnd > new Date())))
										)
								)
							),
						}
					}),
				}
			})
		},
	},
})
