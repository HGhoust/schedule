<template>
	<div class="rounded-2xl">
		<button
			class="w-full h-14 px-2 rounded-2xl text-xl"
			:class="[color, themeStore.theme]"
			:disabled="disabled"
			:type="buttonType"
			@click="onClick"
		>
			{{ text }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'
import { defineProps, type PropType } from 'vue'

const props = defineProps({
	text: {
		type: String,
		default: 'Кнопка',
	},
	disabled: {
		type: Boolean,
		default: false,
		required: false,
	},
	buttonType: {
		type: String as PropType<'button' | 'submit' | 'reset'>,
		default: 'button',
	},
	modelValue: {
		type: Boolean,
		default: true,
		required: false,
	},
	color: {
		type: String,
		default: 'button',
	},
})

const emit = defineEmits(['click'])

const themeStore = useThemeStore()
const onClick = (): void => {
	if (!props.disabled) emit('click')
}
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.danger
	background: #f23027
	color: variables.$bgWhite
	transition: all 0.5s
	&:hover
			font-size: 21px

.submit
	background: #14A444
	color: variables.$bgWhite
	transition: all 0.5s
	&:hover
			font-size: 21px

.light
	.button
		background: variables.$bgButtonWhite
		transition: all 0.5s

		&:hover
			background-color: variables.$bgWhite
			font-size: 21px

.dark
	.button
		background: variables.$bgButtonBlack
		transition: all 0.5s

		&:hover
			background-color: variables.$bgBlack
			font-size: 21px

button
	&:disabled
		background: #f8fafc
		color: #64748b
		cursor: not-allowed
</style>
