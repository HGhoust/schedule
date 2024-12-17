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
			<button @click="themeStore.toggleTheme()">
				<svg
					width="50"
					height="50"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					v-if="themeStore.theme === 'light'"
				>
					<path
						d="M20.4335 13.9335C20.1286 13.9773 19.817 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 7.18303 13.0227 6.87136 13.0665 6.56653C9.91893 7.0192 7.5 9.72711 7.5 13C7.5 16.5898 10.4101 19.5 14 19.5C17.2729 19.5 19.9808 17.0811 20.4335 13.9335Z"
						class="moon"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="40"
					height="40"
					viewBox="0 0 50 50"
					class="sun"
					v-if="themeStore.theme === 'dark'"
				>
					<path
						d="M 24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24 5 L 24 11 A 1.0001 1.0001 0 1 0 26 11 L 26 5 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 10.888672 9.890625 A 1.0001 1.0001 0 0 0 10.193359 11.607422 L 14.392578 15.806641 A 1.0001 1.0001 0 1 0 15.806641 14.392578 L 11.607422 10.193359 A 1.0001 1.0001 0 0 0 10.888672 9.890625 z M 39.080078 9.890625 A 1.0001 1.0001 0 0 0 38.392578 10.193359 L 34.193359 14.392578 A 1.0001 1.0001 0 1 0 35.607422 15.806641 L 39.806641 11.607422 A 1.0001 1.0001 0 0 0 39.080078 9.890625 z M 25 15 A 1.0001 1.0001 0 0 0 24.591797 15.082031 C 19.260044 15.307579 15 19.611572 15 25 C 15 30.533333 19.466667 35 25 35 C 30.533333 35 35 30.533333 35 25 C 35 19.612238 30.740979 15.308576 25.410156 15.082031 A 1.0001 1.0001 0 0 0 25 15 z M 25 17 C 29.466667 17 33 20.533333 33 25 C 33 29.466667 29.466667 33 25 33 C 20.533333 33 17 29.466667 17 25 C 17 20.533333 20.533333 17 25 17 z M 5 24 A 1.0001 1.0001 0 1 0 5 26 L 11 26 A 1.0001 1.0001 0 1 0 11 24 L 5 24 z M 39 24 A 1.0001 1.0001 0 1 0 39 26 L 45 26 A 1.0001 1.0001 0 1 0 45 24 L 39 24 z M 15.080078 33.890625 A 1.0001 1.0001 0 0 0 14.392578 34.193359 L 10.193359 38.392578 A 1.0001 1.0001 0 1 0 11.607422 39.806641 L 15.806641 35.607422 A 1.0001 1.0001 0 0 0 15.080078 33.890625 z M 34.888672 33.890625 A 1.0001 1.0001 0 0 0 34.193359 35.607422 L 38.392578 39.806641 A 1.0001 1.0001 0 1 0 39.806641 38.392578 L 35.607422 34.193359 A 1.0001 1.0001 0 0 0 34.888672 33.890625 z M 24.984375 37.986328 A 1.0001 1.0001 0 0 0 24 39 L 24 45 A 1.0001 1.0001 0 1 0 26 45 L 26 39 A 1.0001 1.0001 0 0 0 24.984375 37.986328 z"
					></path>
				</svg>
			</button>
		</div>
	</header>
</template>

<script setup>
import { getWeekNumber, theWeekDays } from '@/composables'
import { useDataStore, useThemeStore } from '@/stores'
import { computed, ref } from 'vue'

const dataStore = useDataStore()
const themeStore = useThemeStore()

const getCurrentWeek = computed(
	() => `Неделя ${getWeekNumber(dataStore.newTime)}`
)

const currentDayNumber = ref(new Date().getDay())
const currentDay = computed(() => theWeekDays[currentDayNumber.value])
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'
.moon
	stroke: variables.$textDarkBlue

.sun
	stroke: variables.$bgWhite
	fill: variables.$bgWhite
</style>
