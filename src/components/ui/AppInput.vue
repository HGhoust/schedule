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
			@click="deleteInputValue"
			v-if="isActive"
			>&times;</span
		>
		<ul
			class="absolute w-full max-h-96 overflow-y-scroll z-10 mt-1 border rounded-t-md rounded-b-md"
			:class="themeStore.theme"
			ref="ulElement"
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
				@click="selectOption(id), (selectedItemIndex = id)"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { resizeNameAndSurname, useKeyboardNavigation } from '@/composables'
import { useThemeStore } from '@/stores'
import type { PropType } from 'vue'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

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
const selectedItemIndex = ref<number>(0)
const selectRef = ref<null | HTMLInputElement>(null)
const resizeElement = ref<null | HTMLDivElement>(null)
const ulElement = ref<null | HTMLUListElement>(null)
const isActive = ref<boolean>(false)
const isHovered = ref<boolean>(false)

const handleBlur = (): void => {
	//что-бы клик успел сработать при закрытии листа при отмене фокуса с элемента
	setTimeout(() => {
		activeIndex.value = 0
		isActive.value = false
	}, 100)
}

// для прокрутки элемента в видимую область при переключении с помощью стрелок
const scrollToActiveOption = (): void => {
	const activeItem = ulElement.value?.children[activeIndex.value] as HTMLElement
	removeKeyboardClass()

	if (activeItem) {
		activeItem.classList.add('keyboard')
		activeItem.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		})
	}
}

const removeKeyboardClass = (): void => {
	ulElement.value?.querySelectorAll('li').forEach(item => {
		item.classList.remove('keyboard')
	})
}

//Для переключения с клавиатуры
const { handleKeyDown } = useKeyboardNavigation(
	{
		length: localOptions.value.length,
		onEnter(index) {
			!isActive.value ? toggle() : selectOption(index)
		},
		onEscape() {
			isActive.value = false
			activeIndex.value = 0
		},
		onArrowDown() {
			scrollToActiveOption()
		},
		onArrowUp() {
			scrollToActiveOption()
		},
	},
	activeIndex,
	isActive
)

const selectOption = (index: number): void => {
	const selectedItem = localOptions.value[index]

	emit('update:modelValue', selectedItem)
	isActive.value = false
	activeIndex.value = index
	selectedItemIndex.value = activeIndex.value
}

const deleteInputValue = (): void => {
	emit('update:modelValue', '')
	activeIndex.value = 0
}

const updateValue = (): void => {
	if (selectRef.value) {
		emit('update:modelValue', selectRef.value.value)
	}
}

const toggle = async (): Promise<void> => {
	isActive.value = !isActive.value
	removeKeyboardClass()
	// ждем до следующего обновления DOM
	await nextTick()
	// для scroll и назначения класса исходя из данных в input
	const targetIndex = props.modelValue
		? selectedItemIndex.value
		: activeIndex.value
	const targetItem = ulElement.value?.children[targetIndex]

	targetItem?.scrollIntoView({
		behavior: 'smooth',
		block: 'nearest',
	})
	targetItem?.classList.add('keyboard')
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
			return resizeNameAndSurname(item)
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

	&::-webkit-scrollbar
		width: 0
		height: 0

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
