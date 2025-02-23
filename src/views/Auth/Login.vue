<template>
	<Auth submit-title="Вход" submit-text="Войти" @submit="signIn()">
		<template #inputs>
			<div class="">
				<AppInput
					placeholder="Введите почту"
					input-type="email"
					v-model="userStore.email"
				/>
				<span
					class="text-red-700 block pl-3"
					v-if="
						isLogin &&
						modalWindowStore.errorMessage ===
							'Пользователь не найден, зарегистрируйтесь что-бы войти'
					"
					>Пользователь не найден, зарегистрируйтесь что-бы войти</span
				>
			</div>
			<div class="">
				<AppInput
					placeholder="Введите пароль"
					input-type="password"
					:password="true"
					v-model="userStore.password"
				/>
				<span
					class="text-red-700 pl-3"
					v-if="
						modalWindowStore.errorMessage ===
						'Неправильный пароль. Проверьте введенные данные.'
					"
					>Неверный пароль</span
				>
				<span
					class="text-red-700 pl-3"
					v-if="!isLogin && userStore.password !== userStore.passwordConfirm"
					>Пароли не совпадают</span
				>
			</div>
		</template>

		<template #buttons>
			<appButton text="Регистрация" @click="router.replace('/Register')" />
			<appButton
				text="Забыл пароль"
				@click="router.replace('/ResetPassword')"
			/>
		</template>
	</Auth>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import { useDataStore, UseModalWindowStore } from '@/stores'
import { useUserStore } from '@/stores/userStore'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from './index.vue'

const dataStore = useDataStore()
const modalWindowStore = UseModalWindowStore()
const userStore = useUserStore()

const isLogin = ref<boolean>(true)
const router = useRouter()

const signIn = async (): Promise<void> => {
	dataStore.isLoading = true

	try {
		const userCredential = await signInWithEmailAndPassword(
			getAuth(),
			userStore.email,
			userStore.password
		)
		const user = userCredential.user

		if (!user.emailVerified) {
			await signOut(getAuth())
			modalWindowStore.text = 'Пожалуйста подтвердите свою почту'
			modalWindowStore.visible = true
			modalWindowStore.type = 'error'
			return
		}
		router.replace('/')
		modalWindowStore.visible = true
		modalWindowStore.text = 'Вход выполнен успешно'
		modalWindowStore.errorMessage = ''
		userStore.email = ''
		userStore.password = ''
		console.log('Вход выполнен', userCredential.user)
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Ошибка входа:', error.message)

			switch (error.message) {
				case 'Firebase: Error (auth/user-not-found).':
					modalWindowStore.errorMessage =
						'Пользователь не найден, зарегистрируйтесь что-бы войти'
					break
				case 'Firebase: Error (auth/wrong-password).':
					modalWindowStore.errorMessage =
						'Неправильный пароль. Проверьте введенные данные.'
					break
				case 'Firebase: Error (auth/missing-password).':
					modalWindowStore.errorMessage = 'Введите пароль'
					break
				case 'Firebase: Error (auth/invalid-email).':
					modalWindowStore.errorMessage =
						'Некорректная почта. Попробуйте снова.'
					break
				default:
					modalWindowStore.errorMessage =
						'Произошла ошибка. Попробуйте еще раз.'
			}
			modalWindowStore.text = modalWindowStore.errorMessage
			modalWindowStore.visible = true
			modalWindowStore.type = 'error'

			console.log(modalWindowStore.errorMessage)
		}
		throw error
	} finally {
		dataStore.isLoading = false
	}
}
</script>

<style lang="scss" scoped></style>
