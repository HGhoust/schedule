<template>
	<div
		class="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen"
		v-if="visible"
	>
		<div
			class="wrapper flex items-center justify-center w-full h-full gap-x-6 lg:gap-x-10 bg-gray-900 bg-opacity-70"
		>
			<span
				class="dot size-7 lg:size-12 rounded-full shadow-lg"
				:class="{
					'bg-white': themeStore.theme === 'dark',
					'bg-black': themeStore.theme === 'light',
				}"
			></span>
			<span
				class="dot size-7 lg:size-12 rounded-full shadow-lg"
				:class="{
					'bg-white': themeStore.theme === 'dark',
					'bg-black': themeStore.theme === 'light',
				}"
			></span>
			<span
				class="dot size-7 lg:size-12 rounded-full shadow-lg"
				:class="{
					'bg-white': themeStore.theme === 'dark',
					'bg-black': themeStore.theme === 'light',
				}"
			></span>
			<span
				class="dot size-7 lg:size-12 rounded-full shadow-lg"
				:class="{
					'bg-white': themeStore.theme === 'dark',
					'bg-black': themeStore.theme === 'light',
				}"
			></span>
		</div>
	</div>
</template>

<script setup>
import { useThemeStore } from '@/stores'

defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
})

const themeStore = useThemeStore()
</script>

<style lang="sass" scoped>
.wrapper .dot
	animation: animate 1s ease-in-out infinite alternate

.dot
	&:nth-child(1)
		animation-delay: -0.25s
	&:nth-child(2)
		animation-delay: -0.5s
	&:nth-child(3)
		animation-delay: -0.75s
	&:nth-child(4)
		animation-delay: -1s

@keyframes animate
	0%
		transform: translateY(-20px)

	100%
		transform: translateY(10px)
</style>
