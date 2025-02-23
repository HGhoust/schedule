<template>
	<Auth
		submit-title="Восстановление пароля"
		submit-text="Отправить ссылку на почту"
		@submit="resetPassword"
	>
		<template #inputs>
			<div class="">
				<AppInput
					placeholder="Введите почту"
					input-type="email"
					v-model="userStore.email"
				/>
				<span
					class="text-red-700 pl-3"
					v-if="modalWindowStore.errorMessage === 'Пользователь не найден'"
					>Пользователь не найден</span
				>
			</div>
		</template>
		<template #buttons>
			<AppButton text="Вход" @click="router.replace('/Login')" />
		</template>
	</Auth>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import router from '@/router'
import { useDataStore, UseModalWindowStore } from '@/stores'
import { useUserStore } from '@/stores/userStore'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import Auth from './index.vue'

const userStore = useUserStore()
const modalWindowStore = UseModalWindowStore()
const dataStore = useDataStore()

const resetPassword = async () => {
	try {
		await sendPasswordResetEmail(getAuth(), userStore.email)
		modalWindowStore.text = 'Ссылка для восстановления пароля отправлена'
		modalWindowStore.visible = true
		router.push('/Login')
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'Firebase: Error (auth/user-not-found).') {
				modalWindowStore.errorMessage = 'Пользователь не найден'
			}
		}
	} finally {
		dataStore.isLoading = false
	}
}
</script>

<style scoped></style>
