<template>
	<div class="main relative h-screen" :class="themeStore.theme">
		<div
			class="wrapper w-full h-full lg:h-[500px] lg:w-[500px] flex flex-col justify-center min-h-min absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10"
		>
			<AppThemeButton class="absolute top-4 right-4" />
			<form
				action=""
				class="px-7 py-9 flex flex-col justify-center gap-5"
				@submit.prevent="submitForm()"
				@keydown.enter="submitForm()"
			>
				<h1 class="text-center text-2xl">{{ submitTitle }}</h1>
				<slot name="inputs"></slot>

				<AppButton
					button-type="submit"
					:text="submitText"
					:disabled="isFilled"
				/>
				<slot name="buttons"></slot>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppThemeButton from '@/components/ui/AppThemeButton.vue'
import { useDataStore, useThemeStore } from '@/stores'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
	submitText: {
		type: String,
		required: true,
	},
	submitTitle: {
		type: String,
		required: true,
	},
})

const dataStore = useDataStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

const route = useRoute()

const isFilled = computed<boolean>((): boolean => {
	switch (route.path) {
		case '/Login':
			return !userStore.email || !userStore.password

		case '/Register':
			return (
				!userStore.password ||
				!userStore.email ||
				userStore.userName.length <= 3 ||
				userStore.userGroup.length <= 3
			)

		case '/ResetPassword':
			return !userStore.email

		default:
			return false
	}
})

const emit = defineEmits(['submit'])

const submitForm = async (): Promise<void> => {
	try {
		dataStore.isLoading = true
		emit('submit')
	} catch (error) {
		console.log(error)
	}
}
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.light
	.wrapper
		background-color: variables.$bgCardWhite


.dark
	.wrapper
		background-color: variables.$bgCardBlack

@media (min-width: 500px)
	.wrapper
		border-radius: 10px

	.light
		.wrapper
			box-shadow: 5px 5px 20px 1px #9a9999

	.dark
		.wrapper
			box-shadow: 5px 5px 20px 0px #1e1e1e
</style>
