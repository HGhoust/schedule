import { getWeekNumber } from '@/composables'
import { hours, subjectsChgu } from '@/data/data'
import { defineStore } from 'pinia'

import type { IHour, IHourLection, ISchedule, ISubject } from '@/types/date'
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
			return hours.map((hourItem: IHourLection) => {
				const subject = this.filteredSubjects.reduce<ISubject | null>(
					(acc: ISubject | null, subject: ISubject) => {
						const schedule = subject.schedules.reduce<ISchedule | null>(
							(acc: ISchedule | null, schedule: ISchedule) => {
								const isCorrectDay = schedule.day.includes(idx)
								const isCorrectWeek =
									!schedule.week || schedule.week === groupWeek
								const hour = schedule.hours.reduce<IHour | null>(
									(acc: IHour | null, scheduleHour: IHour) => {
										const isGroupMatch =
											scheduleHour.group === groupName ||
											(teacher &&
												(!scheduleHour.dateStart ||
													!scheduleHour.dateEnd ||
													(scheduleHour.dateStart <= this.newTime &&
														scheduleHour.dateEnd > this.newTime)))

										if (
											!acc &&
											scheduleHour.time === hourItem.hour &&
											isGroupMatch
										)
											return scheduleHour
										return acc
									},
									null
								)

								if (isCorrectDay && isCorrectWeek && hour && !acc)
									return { ...schedule, hour }
								return acc
							},
							null
						)

						if (schedule && !acc) return { ...subject, schedule }
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
					subject.schedules.some(schedule => schedule.week === groupWeek)
				const matchesGroupName =
					!groupName ||
					subject.schedules.some(schedule =>
						schedule.hours.some(h => h.group === groupName)
					)

				return matchesTeacher && matchesWeek && matchesGroupName
			})
		},
	},
})
