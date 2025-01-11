<template>
	<div class="card rounded-md" :class="themeStore.theme">
		<div class="flex flex-col justify-center min-h-24">
			<h2 class="text-center">{{ day }}</h2>
			<h2 class="text-center">{{ date }}</h2>
		</div>
		<ul class="flex flex-col">
			<li
				class="px-3"
				v-for="item in dataStore.getDayHours(index)"
				:key="item.positionHour"
			>
				<div class="list-info flex items-center min-h-24" v-if="item.subject">
					<span class="min-w-10">{{ item.positionHour }}</span>
					<div class="flex flex-col flex-1">
						<span class="">{{ resizeSubjectName(item.subject.name) }}</span>
						<div class="flex justify-between">
							<span class="text-xs">Преподаватель</span>
							<span class="text-xs pr-5">{{
								resizeNameAndSurname(item.subject.teacher)
							}}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-xs">Кабинет</span>
							<span class="text-xs pr-5">{{
								item.subject.schedule?.hour?.room
							}}</span>
						</div>
						<!-- <div class="flex justify-between">
							<span class="text-xs">Локация</span>
							<span class="text-xs pr-5">{{
								item.subject.schedule?.location
							}}</span>
						</div> -->
						<div
							class="flex justify-between"
							v-if="timeStartVisible(item, index)"
						>
							<span class="text-xs">До начала пары осталось</span>
							<span class="text-xs pr-5"
								>{{
									updateScheduleTimeStart(timeStart(item), dataStore.newTime)
								}}
							</span>
						</div>
						<div
							class="flex justify-between"
							v-if="timeEndVisible(item, index)"
						>
							<span class="text-xs">До конца пары осталось</span>
							<span class="text-xs pr-5">{{
								updateScheduleTimeEnd(timeEnd(item), dataStore.newTime)
							}}</span>
						</div>
					</div>
				</div>
				<div class="list-info flex items-center min-h-24" v-else>
					<span class="min-w-10">{{ item.positionHour }}</span>
					<span>Нет пары</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import {
	resizeNameAndSurname,
	resizeSubjectName,
	updateScheduleTimeEnd,
	updateScheduleTimeStart,
} from '@/composables'
import { useDataStore, useThemeStore } from '@/stores'
import type { ISubject } from '@/types/date'
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
	index: {
		type: Number,
		required: true,
	},
	day: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: false,
	},
})
const themeStore = useThemeStore()
const dataStore = useDataStore()
// получаем номер дня недели так что-бы 0 был понедельник
const currentDayInWeek = computed(() => (dataStore.newTime.getDay() + 6) % 7)

interface IItem {
	positionHour: string
	subject: ISubject | null
	hour: number
	timeStart: number
	timeEnd: number
}

const timeEnd = (item: IItem): number => {
	return item.subject?.schedule?.hour?.timeEnd as number
}
const timeStart = (item: IItem): number => {
	return item.subject?.schedule?.hour?.timeStart as number
}

const timeEndVisible = (item: IItem, idDay: number): boolean => {
	return (
		updateScheduleTimeEnd(timeEnd(item), dataStore.newTime) !== '00:00:00' &&
		currentDayInWeek.value === idDay
	)
}

const timeStartVisible = (item: IItem, idDay: number): boolean => {
	return (
		updateScheduleTimeStart(timeStart(item), dataStore.newTime) !==
			'00:00:00' && currentDayInWeek.value === idDay
	)
}

let interval: number

onMounted(async (): Promise<void> => {
	await dataStore.fetchSubjects()
	interval = setInterval((): void => {
		dataStore.newTime = new Date()
	}, 999)
})

onUnmounted((): void => {
	clearInterval(interval)
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.card
	border: 1px solid

.dark
	border: 2px solid

.card
	min-height: 450px
	border-color: variables.$textDarkBlue

.list-info
	grid-template-columns: 1fr 7fr
</style>
