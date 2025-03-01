<Loader />
<template>
	<div
		class="card relative rounded-3xl"
		:class="themeStore.theme"
		:id="`${index}`"
	>
		<img
			src="/src//assets/icons/online.svg"
			alt=""
			class="size-4 absolute top-6 right-6"
			v-if="dataStore.currentDayInWeek === index"
		/>
		<div class="flex flex-col justify-center min-h-24">
			<h2 class="text-center">{{ day }}</h2>
			<h2 class="text-center">{{ date }}</h2>
		</div>
		<ul class="flex flex-col">
			<li
				class="list-item px-3 m-3 rounded-3xl"
				v-for="item in dataStore.getDayHours(index)"
				:key="item.positionHour"
			>
				<div
					class="list-info flex items-center min-h-24 py-1"
					v-if="item.subject"
				>
					<span class="min-w-10">{{ item.positionHour }}</span>
					<div class="flex flex-col flex-1">
						<span class="">{{ resizeSubjectName(item.subject.name) }}</span>
						<div class="flex justify-between">
							<span class="text-xs pr-5">{{
								item.subject.schedule?.type
							}}</span>
						</div>
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
							<span class="text-xs">Начало через</span>
							<span class="text-xs pr-5">
								{{ timeStartCurrentOrNextDay(item, index) }}
							</span>
						</div>
						<div
							class="flex justify-between"
							v-if="timeEndVisible(item, index)"
						>
							<span class="text-xs">Конец через</span>
							<span class="text-xs pr-5">{{
								timeEndCurrentOrNextDay(item, index)
							}}</span>
						</div>
					</div>
				</div>
				<div class="list-info flex items-center min-h-24" v-else>
					<span class="min-w-10">{{ item.positionHour }}</span>
					<span :class="{ disable: item }">Нет пары</span>
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
import { onMounted, onUnmounted } from 'vue'

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
		(timeEndCurrentOrNextDay(item, idDay) !== '00:00:00' &&
			idDay === dataStore.currentDayInWeek) ||
		idDay ===
			(dataStore.currentDayInWeek === 6 ? 0 : dataStore.currentDayInWeek + 1)
	)
}

const timeStartVisible = (item: IItem, idDay: number): boolean => {
	return (
		(timeStartCurrentOrNextDay(item, idDay) !== '00:00:00' &&
			idDay === dataStore.currentDayInWeek) ||
		idDay ===
			(dataStore.currentDayInWeek === 6 ? 0 : dataStore.currentDayInWeek + 1)
	)
}

const timeStartCurrentOrNextDay = (item: IItem, idDay: number) => {
	return updateScheduleTimeStart(
		timeStart(item),
		dataStore.newTime,
		dataStore.currentDayInWeek !== idDay ? true : false
	)
}
const timeEndCurrentOrNextDay = (item: IItem, idDay: number) => {
	return updateScheduleTimeEnd(
		timeEnd(item),
		dataStore.newTime,
		dataStore.currentDayInWeek !== idDay ? true : false
	)
}

let interval: number

onMounted(async (): Promise<void> => {
	try {
		dataStore.isLoading = true
		await dataStore.fetchSubjects()
	} catch (error) {
		console.log(error)
	} finally {
		dataStore.isLoading = false
	}

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
	min-height: 450px

.dark
	.card
		background-color: variables.$bgCardBlack
		box-shadow: 5px 5px 20px 0px #1e1e1e

	.list-item
		background-color: variables.$bgButtonBlack

.light
	.card
		background-color: variables.$bgCardWhite
		box-shadow: 5px 5px 20px 0px #CACACC

	.list-item
		background-color: variables.$bgButtonWhite

.list-info
	grid-template-columns: 1fr 7fr

.disable
	color: variables.$textGray
</style>
