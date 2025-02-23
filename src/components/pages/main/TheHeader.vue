<template>
	<header class="flex items-center justify-between mb-6 mx-2">
		<div class="flex-1 flex justify-end">
			<div
				class="user__card grid gap-1 w-full lg:w-[300px] h-14 min-w-min min-h-min p-4 rounded-xl"
			>
				<div class="user flex justify-between gap-1">
					<h3>{{ timesOfDay }}</h3>
					<h3>{{ dataStore.user?.name }}</h3>
				</div>
				<div class="week flex justify-between gap-1">
					<h4>Текущая неделя</h4>
					<h4>{{ getCurrentWeek }}</h4>
				</div>
				<div class="day flex justify-between gap-1">
					<h4>День недели</h4>
					<h4>{{ currentDay }}</h4>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { getWeekNumber, theWeekDays } from '@/composables'
import { useDataStore, useThemeStore } from '@/stores'
import type { IUser } from '@/types/date'
import { computed, onMounted, ref } from 'vue'

const dataStore = useDataStore()
const themeStore = useThemeStore()
const user = ref<IUser | null>(null)
const getHours = computed(() => dataStore.newTime.getHours())

const timesOfDay = computed((): string => {
	let timesOfDay = ''
	if (getHours.value >= 5 && getHours.value < 12) {
		timesOfDay = 'Доброе утро'
	} else if (getHours.value >= 12 && getHours.value < 17) {
		timesOfDay = 'Добрый день'
	} else if (getHours.value >= 17 && getHours.value < 22) {
		timesOfDay = 'Добрый вечер'
	} else if (getHours.value >= 22 || getHours.value < 5) {
		timesOfDay = 'Доброй ночи'
	}

	return timesOfDay
})

const getCurrentWeek = computed(() => `${getWeekNumber(dataStore.newTime)}`)

const currentDayNumber = ref(new Date().getDay())
const currentDay = computed(() => theWeekDays[currentDayNumber.value])

onMounted(() => {
	dataStore.getAuthUser()
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.light
	stroke: variables.$textDarkBlue

	.user__card
		background-color: variables.$bgCardWhite

		h3, h4
			background-color: variables.$bgInputWhite
			padding: 5px 10px
			border-radius: 12px

.dark
	stroke: variables.$bgWhite
	fill: variables.$bgWhite

	.user__card
		background-color: variables.$bgCardBlack

		h3, h4
			background-color: variables.$bgInputBlack
			padding: 5px 10px
			border-radius: 12px
</style>
