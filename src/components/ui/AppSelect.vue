<template>
	<div class="select relative">
		<button
			class="btn w-full h-11 px-2 text-start focus:outline-none rounded-md"
			:class="themeStore.theme"
			ref="selectRef"
			@click="toggle"
			@keydown="handleKeyDown"
		>
			{{ `${text} ${modelValue}` }}
		</button>
		<ul
			class="absolute w-full z-10 mt-1 border rounded-t-md rounded-b-md overflow-hidden"
			:class="themeStore.theme"
			v-if="isActive"
		>
			<li
				class="h-11 px-2 content-center cursor-pointer first:rounded-t-md last:rounded-b-md last:border-0 border-b"
				:class="{
					'themeStore.theme keyboard': activeIndex === id && !isHovered,
				}"
				v-for="(item, id) in options"
				:key="(item as number)"
				@mouseenter="isHovered = true"
				@mouseleave="isHovered = false"
				@click="$emit('update:modelValue', item)"
			>
				{{ `${text} ${item}` }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'
import { onMounted, onUnmounted, ref, type PropType } from 'vue'

const props = defineProps({
	text: {
		type: String,
		default: 'Неделя',
	},
	options: {
		type: Array as PropType<number[] | string[]>,
		default: () => [],
	},
	modelValue: {
		type: Number,
		default: 1,
	},
})

const emit = defineEmits(['update:modelValue'])
const themeStore = useThemeStore()

const selectRef = ref<null | HTMLElement>(null)
const isActive = ref<boolean>(false)
const localOptions = ref<(number | string)[]>([...props.options])
const activeIndex = ref<number>(0)
const isHovered = ref<boolean>(false)

const handleKeyDown = (event: KeyboardEvent): void => {
	if (!localOptions) return

	switch (event.key) {
		case 'ArrowUp':
			event.preventDefault()
			if (isActive.value) {
				activeIndex.value = (activeIndex.value + 1) % localOptions.value.length
			}
			break
		case 'ArrowDown':
			event.preventDefault()
			if (isActive.value) {
				activeIndex.value =
					(activeIndex.value - 1 + localOptions.value.length) %
					localOptions.value.length
			}
			break
		case 'Enter':
			event.preventDefault()
			isActive.value ? selectOption(activeIndex.value) : (isActive.value = true)
			break
		case 'Escape':
			isActive.value = false
			activeIndex.value = 0
			break
	}
}

const selectOption = (index: number): void => {
	const selectedItem = localOptions.value[index]

	isActive.value = false
	emit('update:modelValue', selectedItem)
	activeIndex.value = 0
}

const toggle = (): void => {
	isActive.value = !isActive.value
}

const handleClickOutside = (event: MouseEvent): void => {
	if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
		isActive.value = false
	}
}

onMounted((): void => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted((): void => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.btn
	border-color: variables.$textDarkBlue

.light
	li
		&:hover
			background-color: variables.$textDarkBlue
			color: #fff

	.btn
		border: 1px solid
		border-color: variables.$textDarkBlue

		&:focus
			border: 2px solid

		&::before
			content: ""
			position: absolute
			top: 50%
			right: 20px
			transform: translateY(-50%)
			width: 0
			height: 0
			border-left: 5px solid transparent
			border-right: 5px solid transparent
			border-top: 5px solid variables.$bgDarkBlue

.dark
	li
		border-color: variables.$pink
		&:hover
			background-color: variables.$pink

	ul
		border-color: variables.$pink

	.btn
		border: 2px solid variables.$textDarkBlue !important

		&:focus
			border-color: variables.$pink !important

		&::before
			content: ""
			position: absolute
			top: 50%
			right: 20px
			transform: translateY(-50%)
			width: 0
			height: 0
			border-left: 5px solid transparent
			border-right: 5px solid transparent
			border-top: 5px solid #fff


ul
	border-color: variables.$textDarkBlue

li
	border-color: variables.$textDarkBlue

@media (min-width: 1200px)
	.light
		.keyboard
			background-color: variables.$textDarkBlue
			color: #fff

	.dark
		.keyboard
			background-color: variables.$pink
</style>
