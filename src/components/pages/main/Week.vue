<template>
	<div class="week grid gap-11 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<DayCard
			v-for="(dayInf, index) in currentWeek"
			:key="dayInf.day"
			:index="index"
			:day="dayInf.day"
			:date="dayInf.date"
		/>
	</div>
</template>

<script setup lang="ts">
import { getCurrentWeek } from '@/composables'
import { useDataStore } from '@/stores/dataStore'
import DayCard from './DayCard.vue'

const currentWeek = getCurrentWeek()

const dataStore = useDataStore()
setTimeout(() => {
	console.log(dataStore.getDayHours(0))
}, 3000)
</script>

<style scoped></style>
