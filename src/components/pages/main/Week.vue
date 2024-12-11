<template>
	<div class="week grid gap-11 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		<DayCard
			v-for="day in dataStore.filteredHoursFromDay"
			:key="day.idxDay"
			:data="day"
			:day="day.day"
			:date="day.date"
		/>
	</div>
</template>

<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'
import DayCard from './DayCard.vue'

const dataStore = useDataStore()
</script>

<style scoped></style>
