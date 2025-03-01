<template>
	<button
		class="fixed z-50 pointer bg-none w-14 h-14 bottom-28 right-3 sm:bottom-5"
		@click="scrollUp()"
		v-show="localScrollValueComp > 390"
	>
		<svg
			fill="#000000"
			viewBox="0 0 24 24"
			id="top-circle"
			xmlns="http://www.w3.org/2000/svg"
			class="icon line w-14 h-14"
			width="100%"
			height="100%"
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
						stroke-width: 1.5;
					"
				></path>
			</g>
		</svg>
	</button>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/stores'
import { computed } from 'vue'

const props = defineProps({
	scrollValue: {
		type: Number,
		required: true,
	},
})

const themeStore = useThemeStore()

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
	})
}

const localScrollValueComp = computed(() => props.scrollValue)
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

button
	border-radius: 50%
	display: flex
	align-items: center
	justify-content: center
	transition: transform 0.3s ease-in-out

	svg
		width: 56px
		height: 56px

	&:hover
		transform: scale(1.1)

.light
	stroke: gray

.dark
	stroke: variables.$bgWhite
</style>
