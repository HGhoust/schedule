<template>
	<div :class="themeStore.theme">
		<button
			class="submit w-full h-11 px-2"
			:class="type"
			:disabled="disabled"
			@click="onClick"
		>
			{{ text }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores'
import { defineProps } from 'vue'

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
	type: {
		type: String,
		default: 'btn',
		required: false,
	},
	modelValue: {
		type: Boolean,
		default: true,
		required: false,
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

.submit
	background: #15803d
	color: variables.$bgWhite

.light
	.btn
		background: variables.$textDarkBlue
		color: variables.$bgWhite

button
	border-radius: 0.375rem

	&:disabled
		background: #f8fafc
		color: #64748b
		border: 1px solid variables.$textDarkBlue
		cursor: not-allowed
</style>
