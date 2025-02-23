import { getWeekNumber, stringToDate } from '@/composables'
import { hours } from '@/data/data'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { get, getDatabase, onValue, ref } from 'firebase/database'
import { defineStore } from 'pinia'

import type {
	IHour,
	IHourLection,
	ISchedule,
	IScheduleList,
	IScheduleListHour,
	ISubject,
} from '@/types/date'
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
		schedules: [],
		teachers: [],
		users: [],
		user: null,
		isLoading: false,
		uniqueId: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
	}),
	actions: {
		getAuthUser() {
			onAuthStateChanged(getAuth(), async (currentUser: User | null) => {
				try {
					useDataStore().isLoading = true
					if (currentUser) {
						const userRef = ref(getDatabase(), 'users/' + currentUser.uid)
						const snapshot = await get(userRef)
						this.user = snapshot.exists()
							? snapshot.val()
							: { email: currentUser.email ?? 'Гость' }
						console.log('user', this.user)
					} else {
						this.user = null
					}
					useDataStore().isLoading = false
				} catch (error) {
					console.log(error)
				}
			})
		},

		async fetchTeachers() {
			try {
				const reference = ref(getDatabase(), 'subjects')
				const snapshot = await get(reference)
				const data = snapshot.val()

				if (data) {
					const teacherList = Object.keys(data).map(key => ({
						teacher: data[key].teacher,
						name: data[key].name,
						id: data[key].id,
						key,
					}))

					this.teachers = teacherList
				} else {
					this.teachers = []
				}
				return this.teachers
			} catch (error) {
				console.log(error)
			}
		},

		async fetchUsers() {
			try {
				const reference = ref(getDatabase(), 'users')
				const snapshot = await get(reference)
				const data = snapshot.val()

				if (data) {
					this.users = Object.keys(data).map(key => ({
						createdAt: data[key].createdAt,
						email: data[key].email,
						name: data[key].name,
						role: data[key].role,
						gender: data[key].gender,
						password: data[key].password,
						uId: key,
						group: data[key].group,
					}))
				} else {
					this.users = []
				}
			} catch (error) {
				console.error('Ошибка при загрузке пользователей:', error)
			}
		},

		fetchSchedules(this: IState & { filteredSubjects: ISubject[] }) {
			const reference = ref(getDatabase(), 'schedules')
			onValue(reference, snapshot => {
				const data = snapshot.val()

				if (data) {
					const schedulesList: IScheduleList[] = []
					Object.keys(data).forEach(key => {
						Object.keys(data[key]).forEach(dataKey => {
							const subjectsData = data[key]
							schedulesList.push({
								day: subjectsData[dataKey].day,
								dayCount: subjectsData[dataKey].dayCount,
								hours: subjectsData[dataKey].hours,
								id: subjectsData[dataKey].id,
								location: subjectsData[dataKey].location,
								type: subjectsData[dataKey].type,
								week: subjectsData[dataKey].week,
								dayId: subjectsData[dataKey].dayId,
								key,
							})
						})
					})

					this.schedules = [...schedulesList]
				} else {
					this.schedules = []
				}
			})
			return this.schedules
		},

		getDayHours(
			this: IState & { filteredSubjects: ISubject[] },
			idx: number,
			groupWeek: number = this.filters.groupWeek,
			groupName: string = this.filters.groupName,
			teacher: string = this.filters.teacher
		) {
			return hours?.map((hourItem: IHourLection) => {
				const subject = this.filteredSubjects.reduce<ISubject | null>(
					(acc: ISubject | null, subject: ISubject) => {
						const schedule = subject.schedules.reduce<ISchedule | null>(
							(acc: ISchedule | null, schedule: ISchedule) => {
								const isCorrectDay = schedule.day
									.map(item => item.id)
									.includes(idx)
								const isCorrectWeek =
									!schedule.week || schedule.week === groupWeek
								const hour = schedule.hours?.reduce<IHour | null>(
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
				const auth = getAuth()
				const user = auth.currentUser

				if (!user) {
					throw new Error('Пользователь не авторизован')
				}

				const idToken = await user.getIdToken()

				const response = await fetch(
					`https://schedule-gh-default-rtdb.firebaseio.com/subjects.json?auth=${idToken}`,
					{
						method: 'GET',
					}
				)
				const responseSchedules = await fetch(
					`https://schedule-gh-default-rtdb.firebaseio.com/schedules.json?auth=${idToken}`,
					{
						method: 'GET',
					}
				)
				const data = await response.json()
				const dataSchedules = await responseSchedules.json()
				const dataSchedulesResult = Object.keys(dataSchedules).map(
					(key, id) => {
						return dataSchedules[key].map((item: IScheduleList) => {
							return {
								...item,
								id: item.id,
								hours: item.hours?.map((item: IScheduleListHour) => {
									const [startHour, startMinute] = stringToDate(item.timeStart)
									const [endHour, endMinute] = stringToDate(item.timeEnd)
									return {
										group: item.group,
										room: item.room,
										time: item.time,
										timeStart: new Date().setHours(startHour, startMinute),
										timeEnd: new Date().setHours(endHour, endMinute),
									}
								}),
							}
						})
					}
				)

				const result = Object.keys(data).map((key, id) => ({
					name: data[key].name,
					teacher: data[key].teacher,
					id: data[key].id,
					schedules: dataSchedulesResult
						.flat()
						.filter(item => item.id === data[key].id),
				}))

				this.subjects = [...result]
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		},
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
							schedule?.hours.some(h =>
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
