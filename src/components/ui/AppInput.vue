<template>
	<div class="relative" ref="resizeElement" tabindex="0">
		<input
			class="input w-full h-11 px-2 focus:outline-none rounded-md"
			:class="themeStore.theme"
			ref="selectRef"
			id="input"
			type="search"
			:placeholder="placeholder"
			:value="modelValue"
			@input="updateValue"
			@click="toggle"
			@keydown="handleKeyDown"
			@blur="handleBlur"
		/>
		<span
			class="input--clear"
			:class="themeStore.theme"
			@click="$emit('update:modelValue', '')"
			v-if="isActive"
			>&times;</span
		>
		<ul
			class="absolute w-full max-h-96 overflow-scroll z-10 mt-1 border rounded-t-md rounded-b-md"
			:class="themeStore.theme"
			v-if="isActive && localOptions.length"
		>
			<li
				class="h-11 px-2 content-center cursor-pointer first:rounded-t-md last:rounded-b-md last:border-0 border-b"
				:class="{
					'themeStore.theme keyboard': activeIndex === id && !isHovered,
				}"
				v-for="(item, id) in localOptions"
				:key="id"
				@mouseenter="isHovered = true"
				@mouseleave="isHovered = false"
				@click="selectOption(id)"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'
import type { PropType } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
	placeholder: {
		type: String,
		default: 'Преподаватель',
	},
	modelValue: {
		type: String,
		default: '',
	},
	options: {
		type: Array as PropType<string[]>,
		default: () => [],
	},
})

const emit = defineEmits(['update:modelValue'])
const themeStore = useThemeStore()

const localOptions = ref<string[]>([...props.options])
const activeIndex = ref<number>(0)
const selectRef = ref<null | HTMLInputElement>(null)
const resizeElement = ref<null | HTMLLIElement>(null)
const isActive = ref<boolean>(false)
const isHovered = ref<boolean>(false)

const handleBlur = (): void => {
	//что-бы клик успел сработать при закрытии листа при отмене фокуса с элемента
	setTimeout(() => {
		isActive.value = false
	}, 100)
}

//Для переключения с клавиатуры
const handleKeyDown = (event: KeyboardEvent): void => {
	if (!localOptions.value.length) return
	switch (event.key) {
		case 'ArrowDown':
			event.preventDefault()
			if (isActive.value) {
				//что-бы не превышало длины входных данных
				activeIndex.value = (activeIndex.value + 1) % localOptions.value.length
			}
			break
		case 'ArrowUp':
			event.preventDefault()
			if (isActive.value) {
				//что-бы не превышало длины входных данных и не ушло в отрицательную сторону
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

	emit('update:modelValue', selectedItem)
	isActive.value = false
	activeIndex.value = 0
}

const updateValue = (): void => {
	if (selectRef.value) {
		emit('update:modelValue', selectRef.value.value)
	}
}

const toggle = (): void => {
	isActive.value = !isActive.value
}

const handleClickOutside = (event: MouseEvent): void => {
	if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
		isActive.value = false
	}
}

// Функция для того что-бы укоротить инициалы если ширина меньше 330
const updateTextBasedOnWidth = (width: number): void => {
	if (width < 330) {
		localOptions.value = props.options.map((item: string): string => {
			const parts = item.split(' ')
			if (parts[1]?.[1] === '.' || parts[1]?.[1] === '-' || item.length <= 10) {
				return item
			}
			return `${parts[0]} ${parts[1]?.[0]}.${parts[2]?.[0]}.`
		})
	}
}

onMounted((): void => {
	document.addEventListener('click', handleClickOutside)

	// проверка ширины элемента при монтировании
	if (resizeElement.value) {
		const width = resizeElement.value.getBoundingClientRect().width
		updateTextBasedOnWidth(width)
	}
})

onUnmounted((): void => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.light
	li
		&:hover
			background-color: variables.$textDarkBlue
			color: #fff

	.input
		border: 1px solid

		&:focus
			border: 2px solid

.dark
	li
		border-color: variables.$pink
		&:hover
			background-color: variables.$pink

	ul
		border-color: variables.$pink

	.input
		border: 2px solid variables.$textDarkBlue
		&:focus
			border-color: variables.$pink

.input
	border-color: variables.$textDarkBlue
	&::-webkit-search-cancel-button
		-webkit-appearance: none
	&--clear
		position: absolute
		cursor: pointer
		font-size: 20px
		top: 50%
		right: 15px
		transform: translateY(-50%)

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
