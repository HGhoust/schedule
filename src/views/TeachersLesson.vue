<template>
	{{ localSchedules }}
	<div :class="themeStore.theme">
		<div class="container py-5 pb-32 text-lg">
			<h1 class="text-center text-2xl py-5">Список занятий преподавателя</h1>
			<div class="filters grid grid-cols lg:flex lg:items-end gap-5">
				<div class="flex-1">
					<label for="input" class="block text-base mb-2 ml-3">
						Тип занятии
					</label>
					<AppInput
						class="flex-1"
						v-model="lessonType"
						:options="lessonSearch.typeSearch"
						placeholder="Введите тип занятии"
						input-type="search"
					/>
				</div>
				<div class="flex-1">
					<label for="input" class="block text-base mb-2 ml-3">
						Выбрать дополнительный поиск
					</label>
					<AppSelect
						v-model="searchType"
						:options="['', 'Неделя', 'Занятия', 'Группа', 'Аудитория']"
					/>
				</div>
				<div
					class="flex-1"
					v-for="(input, inputId) in filteredInputs"
					:key="inputId + input.searchType"
				>
					<AppSelect
						v-model="input.model.value"
						:options="input.search"
						input-type="search"
						:placeholder="`${input.text}:`"
						:text="input.text"
						v-if="inputOrSelectInSearch(input.searchType)"
					/>
					<AppInput
						class="flex-1"
						v-model="input.model.value"
						:options="input.search"
						:placeholder="input.placeholder"
						input-type="search"
						v-else
					/>
				</div>
			</div>

			<div
				class="teacher flex gap-2 p-3 mt-7 mx-2 rounded-3xl items-center lg:max-w-96 lg:justify-center"
			>
				<img
					:src="`/src/assets/icons/${addDefaultImage}Teacher${
						themeStore.theme[0].toUpperCase() + themeStore.theme.slice(1)
					}.svg`"
					alt=""
					class="size-24 rounded-full"
				/>
				<div class="teacher__info">
					<h3 class="p-3">
						{{
							filteredTeacherInTeachers(route.params.id as string)[0]?.teacher
						}}
					</h3>
					<h4 class="p-3">
						{{ filteredTeacherInTeachers(route.params.id as string)[0]?.name }}
					</h4>
				</div>
			</div>

			<form
				class="min-h-screen pt-7 px-2 flex flex-col gap-5"
				action=""
				@submit.prevent="saveChanges"
				@keydown.enter="saveChanges"
			>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 gap-7"
					v-if="filteredSchedulesInTeachers(route.params.id as string).length"
				>
					<div
						class="teacher teacher__lesson relative rounded-3xl shadow-lg p-5 lg:p-11"
						v-for="(subjects, subjectId) in filteredSchedules"
						:key="subjects.id + subjectId"
					>
						<h3 class="pl-2 mt-5">Занятие №{{ subjectId + 1 }}</h3>
						<button
							type="button"
							class="absolute right-7 top-7 lg:right-9 lg:top-9 p-2 rounded-full hover:bg-slate-100"
							@click="
								confirmDeletion(subjects.id, 'schedule', '', '', subjects.dayId)
							"
						>
							<img
								:src="`/src/assets/icons/${
									themeStore.theme === 'light' ? 'deleteBlack' : 'deleteWhite'
								}.svg`"
								alt=""
								class="size-9"
							/>
						</button>
						<div class="grid grid-cols-1 items-center gap-3 pb-5 pt-8 lg:mt-0">
							<div class="flex-1">
								<label
									for="button"
									class="block text-base font-medium my-2 ml-3"
								>
									Тип занятии
								</label>
								<AppInput
									id="button"
									v-model="subjects.type"
									placeholder="Тип занятии"
								/>
							</div>
							<div class="flex-1">
								<label
									for="button"
									class="block text-base font-medium my-2 ml-3"
								>
									Количество дней в которых будет занятие
								</label>
								<AppSelect
									id="button"
									v-model="subjects.dayCount"
									:options="[1, 2, 3, 4, 5, 6, 7]"
									text="Количество дней"
									placeholder="Количество дней"
								/>
							</div>
							<div
								class="flex-1"
								v-for="inputInDay in subjects.dayCount"
								:key="inputInDay"
							>
								<label
									for="button"
									class="block text-base font-medium my-2 ml-3"
								>
									День недели №{{ inputInDay }}
								</label>
								<AppSelect
									id="button"
									v-if="subjects.day"
									v-model="subjects.day[inputInDay - 1].day"
									:options="dayInWeek"
								>
								</AppSelect>
							</div>
							<div class="flex-1">
								<label
									for="button"
									class="block text-base font-medium my-2 ml-3"
								>
									Неделя
								</label>
								<AppSelect
									id="button"
									v-model="subjects.week"
									:options="[1, 2]"
									text="Неделя"
									placeholder="Неделя"
								/>
							</div>
							<div
								class="flex-1 pl-5 pb-5"
								v-for="(hour, hourId) in subjects.hours"
								:key="hour.time + hourId"
							>
								<div class="flex justify-end mx-5 mt-4">
									<button
										type="button"
										class="rounded-full hover:bg-slate-100"
										@click="
											confirmDeletion(
												subjects.id,
												'hour',
												String(hour.time),
												hour.hourId
											)
										"
									>
										<img
											:src="`/src/assets/icons/${
												themeStore.theme === 'light'
													? 'deleteBlack'
													: 'deleteWhite'
											}.svg`"
											alt=""
											class="size-9"
										/>
									</button>
								</div>
								<div class="hour grid grid-cols-1 gap-4">
									<div>
										<label for="input" class="block text-base mb-2 ml-3">
											Номер занятии
										</label>
										<AppInput
											id="input"
											placeholder="Номер занятии"
											v-model.number="hour.time"
										/>
									</div>
									<div>
										<label for="input" class="block text-base mb-2 ml-3">
											Время начала
										</label>
										<AppInput
											input-type="time"
											id="input"
											placeholder="Время"
											v-model="hour.timeStart"
										/>
									</div>
									<div>
										<label for="input" class="block text-base mb-2 ml-3">
											Время конца
										</label>
										<AppInput
											input-type="time"
											id="input"
											placeholder="Время"
											v-model="hour.timeEnd"
										/>
									</div>
									<div>
										<label for="input" class="block text-base mb-2 ml-3">
											Группа
										</label>
										<AppInput
											id="input"
											placeholder=""
											v-model="hour.group"
											:disabled="dataStore.user?.role !== 'admin'"
										/>
									</div>
									<div>
										<label
											for="input"
											class="block text-base font-medium mb-2 ml-3"
										>
											кабинет
										</label>
										<AppInput id="input" placeholder="" v-model="hour.room" />
									</div>
								</div>
							</div>
							<AppButton
								text="Добавить часы"
								@click="
									addHour(
										route.params.id as string,
										hourInCurrentLesson(subjects.dayId) !== undefined,
										subjectId
									)
								"
							/>
						</div>
					</div>
				</div>

				<div class="" v-else>
					<h3 class="text-center text-xl">Список преподавателей пуст</h3>
				</div>

				<AppAlert
					v-if="showModal"
					@close="closeModal"
					@confirm="
						deleteObjectsWithMatchingId(
							route.params.id as string,
							deleteAction,
							deleteTimeId,
							deleteHourId,
							deleteDayId
						)
					"
				/>

				<div class="grid grid-cols-1 gap-7 sm:flex lg:gap-9 mt-5">
					<AppButton
						button-type="button"
						text="Добавить Занятие"
						class="w-full lg:w-1/2"
						@click="addLesson(route.params.id as string)"
					/>
					<AppButton
						button-type="submit"
						text="Сохранить изменения"
						color="submit"
						class="w-full lg:w-1/2"
					/>
				</div>
			</form>
			<MenuBar />
		</div>
	</div>
</template>

<script setup lang="ts">
import AppAlert from '@/components/ui/AppAlert.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import MenuBar from '@/components/ui/MenuBar.vue'
import { getCurrentWeek } from '@/composables'
import { useDataStore, UseModalWindowStore, useThemeStore } from '@/stores'
import type { IScheduleList } from '@/types/date'
import {
	ref as dataBaseRef,
	get,
	getDatabase,
	push,
	set,
	update,
} from 'firebase/database'
import { computed, onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

interface IInputSearch {
	search: string[] | number[]
	searchType: string
	placeholder: string
	model: Ref<string | number>
	text?: string
}

interface IInputDay {}

const route = useRoute()
const dataStore = useDataStore()
const themeStore = useThemeStore()
const modalWindowStore = UseModalWindowStore()
const dataBase = getDatabase()

const lessonType = ref<string>('')
const searchType = ref<string>('')
const showModal = ref<boolean>(false)
const selectedLessonId = ref<string>('')
const lessonTime = ref<number>(0)
const lessonWeek = ref<number>(0)
const lessonGroup = ref<string>('')
const lessonRoom = ref<string>('')
const deleteAction = ref<string>('')
const deleteTimeId = ref<string>('')
const deleteHourId = ref<string>('')
const deleteDayId = ref<string>('')

const dayInWeek = computed(() => getCurrentWeek().map(day => day.day))

const localSchedules = computed(() => {
	return dataStore.schedules.map(schedule => {
		while (schedule.day.length < schedule.dayCount) {
			schedule.day.push({
				day: 'Понедельник',
				id: dayInWeek.value.findIndex(dayWeek => dayWeek === 'Понедельник'),
			})
		}
		while (schedule.day.length > schedule.dayCount) {
			schedule.day.pop()
		}

		return schedule
	})
})

const filteredSchedulesInTeachers = (id: string) => {
	return localSchedules.value.filter(
		item =>
			(item.id === id && dataStore.user?.role === 'admin') ||
			(item.id === id &&
				item.hours?.find(
					hour => !hour.group || hour.group === dataStore.user?.group
				)) ||
			(item.id === id && !item.hours)
	)
}

const filteredTeacherInTeachers = (id: string) => {
	return dataStore.teachers.filter(item => item.id === id)
}

const filteredSchedules = computed(() => {
	return filteredSchedulesInTeachers(route.params.id as string).filter(
		schedule => {
			const matchesType =
				!lessonType.value ||
				schedule.type.toLowerCase().includes(lessonType.value.toLowerCase())

			const matchesGroup =
				!lessonGroup.value ||
				schedule.hours.find(hour =>
					hour.group.toLowerCase().includes(lessonGroup.value.toLowerCase())
				)

			const matchesTime =
				!lessonTime.value ||
				schedule.hours.find(hour => hour.time === Number(lessonTime.value))

			const matchesRoom =
				!lessonRoom.value ||
				schedule.hours.find(hour => hour.room === lessonRoom.value)

			const matchesWeek =
				!lessonWeek.value || schedule.week === lessonWeek.value

			return (
				matchesType && matchesTime && matchesGroup && matchesWeek && matchesRoom
			)
		}
	)
})

// получаем час текущей занятии
const hourInCurrentLesson = (dayId: string) => {
	return filteredSchedulesInTeachers(route.params.id as string).find(
		subject => subject.dayId === dayId
	)?.hours
}

const lessonSearch = computed(() => {
	const timeSearch = [
		0,
		...new Set(
			dataStore.schedules
				.map(schedule => schedule.hours?.map(hour => hour.time))
				.flat()
		),
	].sort((a, b) => a - b)

	const typeSearch = [
		...new Set(dataStore.schedules?.map(schedule => schedule.type)),
	]

	const weekSearch = [
		0,
		...new Set(
			dataStore.schedules
				?.filter(schedule => schedule.week !== 0)
				?.map(schedule => schedule.week)
		),
	]

	const groupSearch = [
		...new Set(
			dataStore.schedules
				?.map(schedule => schedule?.hours?.map(hour => hour?.group))
				.flat()
		),
	]

	const roomSearch = [
		...new Set(
			dataStore.schedules
				?.map(schedule => schedule?.hours?.map(hour => hour?.room))
				.flat()
		),
	]

	return {
		timeSearch,
		typeSearch,
		weekSearch,
		groupSearch,
		roomSearch,
	}
})

const searchInputs = computed((): IInputSearch[] => [
	{
		search: lessonSearch.value.timeSearch,
		searchType: 'Занятия',
		placeholder: 'Введите занятие',
		model: lessonTime,
		text: 'Номер занятии',
	},
	{
		search: lessonSearch.value.weekSearch,
		searchType: 'Неделя',
		placeholder: 'Введите неделю',
		model: lessonWeek,
		text: 'Неделя',
	},
	{
		search: lessonSearch.value.groupSearch,
		searchType: 'Группа',
		placeholder: 'Введите группу',
		model: lessonGroup,
		text: 'Группа',
	},
	{
		search: lessonSearch.value.roomSearch,
		searchType: 'Аудитория',
		placeholder: 'Введите название аудитории',
		model: lessonRoom,
		text: 'Аудитория',
	},
])

const filteredInputs = computed((): IInputSearch[] => {
	const matchesInput = searchType.value
		? searchInputs.value.filter(input =>
				input.searchType.toLowerCase().includes(searchType.value.toLowerCase())
		  )
		: []
	return matchesInput
})

const inputOrSelectInSearch = (type: string) => {
	return type === 'Занятия' || type === 'Неделя' ? true : false
}

const confirmDeletion = (
	scheduleId: string,
	action: string,
	time: string = '',
	hourId: string = '',
	dayId: string = ''
) => {
	showModal.value = true
	deleteAction.value = action
	deleteTimeId.value = time
	deleteHourId.value = hourId
	deleteDayId.value = dayId
	selectedLessonId.value = scheduleId
}

const closeModal = () => {
	showModal.value = false
	deleteAction.value = ''
	deleteTimeId.value = ''
	deleteHourId.value = ''
	deleteDayId.value = ''
	selectedLessonId.value = ''
}

const saveChanges = async (): Promise<void> => {
	try {
		const schedulesRef = dataBaseRef(dataBase, 'schedules')
		const schedulesSnapshot = await get(schedulesRef)
		const schedulesData = schedulesSnapshot.val()

		// добавление изменений
		const updates: Record<string, any> = {}

		if (schedulesData) {
			// итерация по ключам из полученных данных
			Object.keys(schedulesData).forEach(scheduleKey => {
				// текущий объект
				const schedule = schedulesData[scheduleKey]

				// обновляем данные к каждому дню
				schedule.forEach((day: any, dayIndex: number) => {
					const updatedDay = dataStore.schedules.find(
						(d: IScheduleList) => d.dayId === day.dayId
					)

					if (updatedDay) {
						// обновление
						updates[`schedules/${scheduleKey}/${dayIndex}`] = {
							day: updatedDay.day.map(day => {
								return {
									day: day.day,
									id: dayInWeek.value.findIndex(dayWeek => dayWeek === day.day),
								}
							}),
							dayCount: updatedDay.dayCount,
							hours: updatedDay.hours,
							id: updatedDay.id,
							dayId: updatedDay.dayId,
							location: updatedDay.location,
							type: updatedDay.type,
							week: updatedDay.week,
						}
					}
				})
			})
		}

		// применение на сервере
		await update(dataBaseRef(dataBase), updates)
		modalWindowStore.text = 'Изменения успешно сохранены'
		modalWindowStore.visible = true
		console.log('Данные успешно обновлены')
	} catch (error) {
		console.error('Ошибка при обновлении данных:', error)
	}
}

const addHour = async (
	targetId?: string,
	hoursInTargetDay?: boolean,
	targetDayId?: number
) => {
	try {
		const schedulesRef = dataBaseRef(dataBase, 'schedules')
		const schedulesSnapshot = await get(schedulesRef)
		const schedulesData = schedulesSnapshot.val()

		// новый час
		const hour = {
			group: dataStore.user?.group ? dataStore.user?.group : '',
			hourId: targetId ? targetId + Math.floor(Math.random() * 1000) : '',
			room: '',
			time: 2,
			timeStart: '',
			timeEnd: '',
		}

		// проверяем на есть ли часы
		switch (hoursInTargetDay) {
			case true:
				if (schedulesData) {
					for (const scheduleKey of Object.keys(schedulesData)) {
						const schedule = schedulesData[scheduleKey]
						schedule.forEach(async (day: IScheduleList, dayId: number) => {
							if (day.id === targetId && dayId === targetDayId) {
								day.hours?.push(hour)
								await set(
									dataBaseRef(dataBase, `schedules/${scheduleKey}`),
									schedule
								)
							}
						})
					}
				}
				break
			case false:
				if (schedulesData) {
					for (const scheduleKey of Object.keys(schedulesData)) {
						const schedule = schedulesData[scheduleKey]
						schedule.forEach(async (day: IScheduleList, dayId: number) => {
							if (day.id === targetId && dayId === targetDayId) {
								day.hours = [hour]
								await set(
									dataBaseRef(dataBase, `schedules/${scheduleKey}`),
									schedule
								)
							}
						})
					}
				}
				console.log('Данные успешно обновлены')
				break
		}
	} catch (error) {
		console.error('Ошибка при обновлении данных:', error)
	}
}

const addLesson = async (targetId?: string) => {
	try {
		const schedulesRef = dataBaseRef(dataBase, 'schedules')
		const schedulesSnapshot = await get(schedulesRef)
		const schedulesData = schedulesSnapshot.val()
		// создаем новое занятие
		const newLessonDay = {
			day: [{ id: 1, day: 'Понедельник' }],
			dayCount: 1,
			dayId: targetId ? targetId + Math.floor(Math.random() * 1000) : '',
			hours: [
				{
					group: dataStore.user?.group ? dataStore.user?.group : '',
					hourId: targetId ? targetId + Math.floor(Math.random() * 1000) : '',
					room: '',
					time: 2,
					timeStart: '',
					timeEnd: '',
				},
			],
			id: targetId,
			location: '',
			type: '',
			week: 1,
		}

		// проверяем есть ли вообще занятий у преподавателя
		switch (
			filteredSchedulesInTeachers(route.params.id as string).length !== 0
		) {
			case true:
				if (schedulesData) {
					for (const scheduleKey of Object.keys(schedulesData)) {
						const schedule = schedulesData[scheduleKey]
						schedule.forEach(async (day: IScheduleList, dayId: number) => {
							if (day.id === targetId && dayId < 1) {
								schedule.push(newLessonDay)
								await set(
									dataBaseRef(dataBase, `schedules/${scheduleKey}`),
									schedule
								)
							}
						})

						console.log('schedule', schedule)
						console.log('scheduleKey', scheduleKey)
						console.log('scheduleData', schedulesData)
					}
				}
				break
			case false:
				await push(schedulesRef, [newLessonDay])
				console.log('Данные успешно обновлены')
				break
		}
	} catch (error) {
		console.error('Ошибка при обновлении данных:', error)
	}
}

const deleteObjectsWithMatchingId = async (
	targetId: string,
	action: string,
	time: string = '',
	hourInArg: string = '',
	dayIdInArg: string = ''
) => {
	try {
		showModal.value = false
		const schedulesRef = dataBaseRef(dataBase, 'schedules')
		const schedulesSnapshot = await get(schedulesRef)
		const schedulesData = schedulesSnapshot.val()

		switch (action) {
			// проверяем что именно нужно удалить
			case 'schedule':
				if (schedulesData) {
					for (const scheduleKey of Object.keys(schedulesData)) {
						const schedule = schedulesData[scheduleKey]

						const dayIndex = schedule.findIndex((dayLesson: IScheduleList) => {
							return dayLesson.dayId === dayIdInArg
						})

						if (dayIndex !== -1) {
							// удаляем из полученных данных
							schedule.splice(dayIndex, 1)

							// и сразу обновляем на сервере
							await set(
								dataBaseRef(dataBase, `schedules/${scheduleKey}`),
								schedule
							)

							console.log(
								`Объект с time=${time} и id=${targetId} удалён из schedules/${scheduleKey}/${dayIndex}/hours`
							)
						} else {
							console.log(
								`Не удалось найти объект с time=${time} и id=${targetId} в schedules/${scheduleKey}/${dayIndex}/hours`
							)
						}
					}
				}
				break

			case 'hour':
				if (schedulesData && time) {
					for (const scheduleKey of Object.keys(schedulesData)) {
						const schedule = schedulesData[scheduleKey]

						schedule.forEach(async (day: any, dayIndex: number) => {
							if (day.hours) {
								// ищем индекс
								const hourIndex = day.hours.findIndex(
									(hour: any, hourId: number) =>
										hour.time === Number(time) && hour.hourId === hourInArg
								)

								if (hourIndex !== -1) {
									// удаление объекта из массива
									day.hours.splice(hourIndex, 1)

									// обновление
									await set(
										dataBaseRef(
											dataBase,
											`schedules/${scheduleKey}/${dayIndex}`
										),
										day
									)

									console.log(
										`Объект с time=${time} и id=${targetId} удалён из schedules/${scheduleKey}/${dayIndex}/hours`
									)
								} else {
									console.log(
										`Не удалось найти объект с time=${time} и id=${targetId} в schedules/${scheduleKey}/${dayIndex}/hours`
									)
								}
							}
						})
					}
				}
				break
		}
	} catch (error) {
		console.error('Ошибка при удалении объектов:', error)
	}
}

const addDefaultImage = computed(() => {
	return filteredTeacherInTeachers(route.params.id as string)?.map(element => {
		let surname = element?.teacher.split(' ')[0]
		return surname[surname.length - 1] === 'а' ? 'woman' : 'man'
	})
})

onMounted(() => {
	dataStore.fetchTeachers()
	dataStore.fetchSchedules()
	dataStore.fetchSubjects()
	dataStore.getAuthUser()
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.dark
	.teacher
		background-color: variables.$bgCardBlack
		box-shadow: 5px 5px 20px 0px #1e1e1e

	.button
		&--delete
			background: none
			&:hover
				background-color: variables.$bgButtonBlack

.light
	.teacher
		background-color: variables.$bgCardWhite
		box-shadow: 5px 5px 20px 0px #CACACC

	.button
		&--delete
			background: none
			&:hover
				background-color: variables.$bgButtonWhite
</style>
