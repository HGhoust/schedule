<template>
	<div class="select relative text-xl">
		<button
			class="btn relative w-full h-14 px-7 text-start focus:outline-none rounded-xl"
			:class="themeStore.theme"
			ref="selectRef"
			type="button"
			@click="toggle"
			@keydown="handleKeyDown"
		>
			{{
				`${modelValue === 0 || modelValue === '' ? '' : placeholder} ${
					modelValue === 0 || modelValue === '' ? 'Не выбран' : modelValue
				}`
			}}
			<slot></slot>
		</button>
		<span :class="{ 'btn--bottom': !isActive }" />
		<!-- <span
			class="btn--clear"
			:class="themeStore.theme"
			@click="deleteInputValue"
			v-if="modelValue && isActive"
			>&times;</span
		> -->
		<ul
			class="absolute w-full max-h-96 z-10 mt-1 rounded-2xl overflow-hidden"
			:class="themeStore.theme"
			v-if="isActive"
		>
			<li
				class="h-14 px-2 content-center cursor-pointer rounded-2xl"
				:class="{
					'themeStore.theme keyboard': activeIndex === id && !isHovered,
				}"
				v-for="(item, id) in options"
				:key="(item as number)"
				@mouseenter="isHovered = true"
				@mouseleave="isHovered = false"
				@click="$emit('update:modelValue', item)"
			>
				{{
					`${item === 0 || item === '' ? '' : text} ${
						item === 0 || item === '' ? 'Не выбран' : item
					}`
				}}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useKeyboardNavigation } from '@/composables'
import { useThemeStore } from '@/stores/themeStore'
import { onMounted, onUnmounted, ref, type PropType } from 'vue'

const props = defineProps({
	text: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	options: {
		type: Array as PropType<number[] | string[]>,
		default: () => [],
	},
	modelValue: {
		type: [Number, String] as PropType<number | string | number[] | string[]>,
		default: 0,
	},
})

const emit = defineEmits(['update:modelValue'])
const themeStore = useThemeStore()

const selectRef = ref<null | HTMLElement>(null)
const isActive = ref<boolean>(false)
const localOptions = ref<(number | string)[]>([...props.options])
const activeIndex = ref<number>(0)
const isHovered = ref<boolean>(false)

const deleteInputValue = (): void => {
	emit('update:modelValue', '')
	activeIndex.value = 0
}

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
	},
	activeIndex,
	isActive
)

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
	&--clear
		position: absolute
		cursor: pointer
		font-size: 20px
		top: 50%
		right: 20px
		transform: translateY(-50%)
		background: none

.light
	li
		&:hover
			background: variables.$bgButtonWhite
			color: #000

	.btn
		background-color: variables.$bgInputWhite

		&--bottom
			content: ""
			position: absolute
			top: 50%
			right: 20px
			transform: translateY(-50%)
			width: 0
			height: 0
			border-left: 5px solid transparent
			border-right: 5px solid transparent
			border-top: 5px solid black

	ul
		background-color: variables.$bgCardWhite
		box-shadow: 5px 5px 20px 0px #CACACC

	li
		background-color: variables.$bgCardWhite

.dark
	li
		&:hover
			background: variables.$bgButtonBlack
			color: #fff

	.btn
		background-color: variables.$bgInputBlack

		&--bottom
			content: ""
			position: absolute
			top: 50%
			right: 20px
			transform: translateY(-50%)
			width: 0
			height: 0
			border-left: 5px solid transparent
			border-right: 5px solid transparent
			border-top: 5px solid white

	ul
		background-color: variables.$bgCardBlack
		box-shadow: 5px 5px 20px 0px #1e1e1e

	li
		background-color: variables.$bgCardBlack

@media (min-width: 1200px)
	.light
		.keyboard
			background: variables.$bgButtonWhite
			color: #000

	.dark
		.keyboard
			background: variables.$bgButtonBlack
</style>
