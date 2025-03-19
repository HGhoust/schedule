<template>
	<div
		class="week grid gap-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-32"
	>
		<DayCard
			v-for="(dayInf, index) in currentWeek"
			:key="dayInf.day"
			:index="index"
			:day="dayInf.day"
			:date="dayInf.date"
		/>
	</div>
	<div class="fixed right-1 top-1/3">
		<button
			class="shadow-sm rounded-lg bg-[#949295] text-white p-1"
			@click="scrollInToCurrentDay()"
			v-if="
				dataStore.currentDayInWeek !== 0 && dataStore.currentDayInWeek !== 1
			"
		>
			Сегодня
		</button>
	</div>
</template>

<script setup lang="ts">
import { getCurrentWeek } from '@/composables'
import { useDataStore, useThemeStore } from '@/stores'
import DayCard from './DayCard.vue'
const dataStore = useDataStore()
const themeStore = useThemeStore()

const currentWeek = getCurrentWeek()
const scrollInToCurrentDay = () => {
	document
		.getElementById(`${dataStore.currentDayInWeek}`)
		?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="sass" scoped></style>
