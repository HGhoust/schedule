<template>
	<header class="flex items-center justify-between mb-6 mx-2">
		<div class="flex-1">
			<h2>Расписание</h2>
		</div>
		<div
			class="flex-1 flex flex-col items-center sm:flex-row sm:justify-around"
		>
			<h2>{{ currentDay }}</h2>
			<h2>{{ getCurrentWeek }}</h2>
		</div>
		<div class="flex-1 flex justify-end">
			<AppThemeButton />
		</div>
	</header>
</template>

<script setup>
import AppThemeButton from '@/components/ui/AppThemeButton.vue'
import { getWeekNumber, theWeekDays } from '@/composables'
import { useDataStore } from '@/stores'
import { computed, ref } from 'vue'

const dataStore = useDataStore()

const getCurrentWeek = computed(
	() => `Неделя ${getWeekNumber(dataStore.newTime)}`
)

const currentDayNumber = ref(new Date().getDay())
const currentDay = computed(() => theWeekDays[currentDayNumber.value])
</script>

<style lang="sass" scoped></style>
