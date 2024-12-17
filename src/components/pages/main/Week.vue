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
	<div class="scroll relative flex justify-center pt-7">
		<button
			class="fixed z-50 button w-14 h-14 bottom-0"
			@click="scrollUp()"
			v-if="scrollValue > 390"
		>
			<svg
				fill="#000000"
				viewBox="0 0 24 24"
				id="top-circle"
				xmlns="http://www.w3.org/2000/svg"
				class="icon line"
			>
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g>
				<g id="SVGRepo_iconCarrier">
					<path
						id="primary"
						d="M21,12a9,9,0,1,1-9-9A9,9,0,0,1,21,12Zm-9,4V8M9.5,10.5,12,8l2.5,2.5"
						:class="themeStore.theme"
						style="
							fill: none;
							stroke-linecap: round;
							stroke-linejoin: round;
							stroke-width: 0.7;
						"
					></path>
				</g>
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { getCurrentWeek } from '@/composables'
import { useThemeStore } from '@/stores'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import DayCard from './DayCard.vue'

const currentWeek = getCurrentWeek()
const themeStore = useThemeStore()
const scrollValue = ref(0)

// прокрутка вверх для движка firefox включительно
const scrollElement = computed(
	(): HTMLElement =>
		document.documentElement.scrollTop
			? document.documentElement
			: document.body
)

//firefox не поддерживает прокрутки body
const scrollUp = (): void => {
	;(scrollElement.value as HTMLElement).scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}

const updateScroll = () => {
	scrollValue.value = window.scrollY || document.body.scrollTop
}

onMounted(() => {
	if (window.scrollY) {
		window.addEventListener('scroll', updateScroll)
	} else {
		document.body.addEventListener('scroll', updateScroll)
	}
})

onUnmounted(() => {
	if (window.scrollY) {
		window.removeEventListener('scroll', updateScroll)
	} else {
		document.body.removeEventListener('scroll', updateScroll)
	}
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.light
	stroke: variables.$textDarkBlue

.dark
	stroke: variables.$bgWhite
</style>
