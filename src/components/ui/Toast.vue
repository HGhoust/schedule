<template>
	<div
		class="fixed right-1 top-1/2 z-30 -translate-y-1/2 w-[200px] h-[100px] lg:w-[300px] lg:h-[150px] lg:min-w-min min-w-[80%] min-h-min p-5 flex items-center gap-5 rounded-3xl shadow-lg"
		:class="themeStore.theme === 'light' ? 'bg-white' : 'bg-black'"
	>
		<div class="size-12 rounded-xl">
			<img :src="`/src/assets/icons/${type}.svg`" alt="/" />
		</div>
		<div class="flex items-center flex-1 rounded-xl">
			<h2
				class="text-sm lg:text-lg max-w-full"
				:class="themeStore.theme === 'light' ? 'text-black' : 'text-white'"
			>
				{{ text }}
			</h2>
		</div>
	</div>
</template>

<script setup lang="ts">
import { UseModalWindowStore, useThemeStore } from '@/stores'
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
	text: {
		type: String,
		default: 'Успешно!',
	},
	type: {
		type: String,
		default: 'accept',
	},
	time: {
		type: Number,
		default: 3000,
	},
})

const modalWindowStore = UseModalWindowStore()
const themeStore = useThemeStore()

let timeout: number

onMounted(() => {
	timeout = setTimeout(() => {
		modalWindowStore.visible = false
		modalWindowStore.time = 3000
		modalWindowStore.type = 'accept'
	}, props.time)
})

onUnmounted(() => {
	clearTimeout(timeout)
})
</script>

<style lang="sass" scoped></style>
