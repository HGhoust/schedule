import { getWeekNumber } from '@/composables'
import { hours } from '@/data/data'
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
		subjects: [],
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

		async fetchSubjects() {
			try {
				const response = await fetch(
					'https://schedule-gh-default-rtdb.firebaseio.com/subjects.json',
					{
						method: 'GET',
					}
				)
				const responseSchedules = await fetch(
					'https://schedule-gh-default-rtdb.firebaseio.com/schedules.json',
					{
						method: 'GET',
					}
				)
				const data = await response.json()
				const dataSchedules = await responseSchedules.json()
				const dataSchedulesResult = Object.keys(dataSchedules).map(
					(key, id) => {
						return dataSchedules[key].map((item: ISchedule) => {
							return {
								...item,
								key: Object.keys(data)[id],
								hours: item.hours.map((item: IHour) => {
									return {
										group: item.group,
										room: item.room,
										time: item.time,
										timeStart: hours[item.time / 2 - 1].timeStart,
										timeEnd: hours[item.time / 2 - 1].timeEnd,
									}
								}),
							}
						})
					}
				)

				const result = Object.keys(data).map((key, id) => ({
					name: data[key].name,
					teacher: data[key].teacher,
					key: key,
					schedules: dataSchedulesResult
						.flat()
						.filter(item => item.idx === data[key].idx),
					schedules2: dataSchedulesResult[id][0].id,
				}))

				this.subjects = [...result]
				console.log('Processed Subjects:', this.subjects)
				console.log('id', dataSchedulesResult)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		},

		// addSubject(
		// 	this: IState & { filteredSubjects: ISubject[] },
		// 	name: string,
		// 	teacher: string,
		// 	group: string,
		// 	type: string,
		// 	location: string,
		// 	room: string,
		// 	week: number,
		// 	day: number[],
		// 	position: number,
		// 	hours: IHourLection[]
		// ) {
		// 	subjectsChgu.push(<ISubject>{
		// 		name: name,
		// 		teacher: teacher,
		// 		schedules: [
		// 			{
		// 				type: type,
		// 				location: location,
		// 				day: day,
		// 				week: week,
		// 				hours: [
		// 					{
		// 						room: room,
		// 						time: position % 2 === 0 ? position : position + 1,
		// 						group: group,
		// 						timeStart: hours[position - 1].timeStart,
		// 						timeEnd: hours[position - 1].timeEnd,
		// 					},
		// 				],
		// 			},
		// 		],
		// 	})
		// 	console.log(subjectsChgu)
		// },
	},

	getters: {
		filteredSubjects: (state: IState): ISubject[] => {
			const { groupName, teacher, groupWeek } = state.filters

			if (state.subjects.length) {
				return state.subjects.filter((subject: ISubject) => {
					const matchesTeacher =
						!teacher ||
						subject.teacher.toLowerCase().includes(teacher.toLowerCase())
					const matchesWeek =
						!groupWeek ||
						subject.schedules.some(schedule => schedule.week === groupWeek)
					const matchesGroupName =
						!groupName ||
						subject.schedules.some(schedule =>
							schedule.hours.some(h =>
								h.group.toLowerCase().includes(groupName.toLowerCase())
							)
						)

					return matchesTeacher && matchesWeek && matchesGroupName
				})
			}
			return []
		},
	},
})
