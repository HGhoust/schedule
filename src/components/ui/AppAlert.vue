<template>
	<Teleport to="body">
		<Transition name="transition">
			<div
				class="main w-full h-screen fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-50"
				:class="themeStore.theme"
			>
				<div
					class="wrapper size-80 rounded-2xl p-7 absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10"
				>
					<div class="px-5 py-5 flex flex-col justify-center gap-5 h-full">
						<h1 class="text-center text-xl">
							Вы действительно хотите удалить?
						</h1>
						<appButton
							text="Удалить"
							buttonType="submit"
							color="danger"
							@click="confirm"
						/>
						<appButton text="Отмена" buttonType="button" @click="close" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import { useThemeStore } from '@/stores'

const emit = defineEmits(['close', 'confirm'])

const close = () => emit('close')
const confirm = () => emit('confirm')

const themeStore = useThemeStore()
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.transition-enter-active, .transition-leave-active
	transition: opacity 0.3s ease

.transition-enter-from, .transition-leave-to
	opacity: 0

.main
	background-color: rgba(231,230,230,0.7)

.wrapper
	background-color: variables.$bgCardWhite

@media (min-width: 500px)
.light
	.wrapper
		background-color: variables.$bgCardWhite


.dark
	.wrapper
		background-color: variables.$bgCardBlack

.wrapper
	width: 500px
	height: 500px
	box-shadow: 5px 5px 20px 1px #9a9999
	border-radius: 10px
</style>
