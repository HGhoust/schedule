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
			<button class="size-8 cursor-pointer z-20" @click="openAside()">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						<path
							:class="themeStore.theme"
							d="M4 6H20M4 12H20M4 18H20"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</g>
				</svg>
			</button>
		</div>
	</header>
</template>

<script setup lang="ts">
import { getWeekNumber, theWeekDays } from '@/composables'
import { useDataStore, useThemeStore } from '@/stores'
import { computed, inject, ref } from 'vue'

const aside = ref(inject('aside'))
const dataStore = useDataStore()
const themeStore = useThemeStore()

const getCurrentWeek = computed(
	() => `Неделя ${getWeekNumber(dataStore.newTime)}`
)

const currentDayNumber = ref(new Date().getDay())
const currentDay = computed(() => theWeekDays[currentDayNumber.value])
const openAside = (): boolean => (aside.value = true)
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.light
	stroke: variables.$textDarkBlue

.dark
	stroke: variables.$bgWhite
	fill: variables.$bgWhite
</style>
