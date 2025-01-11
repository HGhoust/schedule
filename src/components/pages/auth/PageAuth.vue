<template>
	<div class="main relative h-screen" :class="themeStore.theme">
		<div
			class="wrapper h-screen w-full absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10"
		>
			<AppThemeButton class="absolute top-4 right-4" />
			<form
				action=""
				class="px-5 py-5 flex flex-col justify-center gap-5 h-full"
				@submit.prevent="submitForm()"
			>
				<h1 class="text-center text-2xl">{{ titleText }}</h1>
				<AppInput
					placeholder="Введите почту"
					input-type="email"
					v-model="email"
				/>
				<AppInput
					placeholder="Введите пароль"
					input-type="password"
					:password="true"
					v-model="password"
				/>
				<AppInput
					placeholder="Подтвердите пароль"
					input-type="password"
					:password="true"
					v-model="passwordConfirm"
					v-if="!isLogin"
				/>
				<appButton
					:text="submitButtonText"
					type="submit"
					:disabled="isFilled"
				/>
				<appButton :text="authButtonText" @click="toggleAuth" />
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppThemeButton from '@/components/ui/AppThemeButton.vue'
import { useThemeStore } from '@/stores'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()
const isLogin = ref<boolean>(true)
const password = ref('')
const passwordConfirm = ref('')
const email = ref<string>('')
const isLoading = ref<boolean>(false)
const router = useRouter()

const isFilled = computed<boolean>(() =>
	isLogin.value
		? !email.value || !password.value
		: !password.value || !email.value
)
const titleText = computed<string>(() =>
	isLogin.value ? 'Вход' : 'Регистрация'
)
const submitButtonText = computed<string>(() =>
	isLogin.value ? 'Войти' : 'Зарегистрироваться'
)
const authButtonText = computed<string>(() =>
	isLogin.value ? 'Регистрация' : 'Вход в аккаунт'
)

const toggleAuth = () => (isLogin.value = !isLogin.value)

const submitForm = (): void => {
	const signUpError = () => {
		console.log('ssss', 'Пароли не совпадают')
	}

	if (isLogin.value) {
		signIn()
	} else if (!isLogin.value) {
		password.value === passwordConfirm.value ? signUp() : signUpError()
	}
}

const signUp = async (): Promise<void> => {
	isLoading.value = true
	try {
		await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
		router.push('/')
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message)
		}
	} finally {
		isLoading.value = false
	}
}
const signIn = async (): Promise<void> => {
	isLoading.value = true
	try {
		await signInWithEmailAndPassword(getAuth(), email.value, password.value)
		router.push('/')
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message)
		}
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.wrapper
	background-color: variables.$bgWhite

@media (min-width: 500px)
	.main
		background-color: #e7e6e6

	.wrapper
		width: 500px
		height: 500px
		box-shadow: 5px 5px 20px 1px #9a9999
		border-radius: 10px
</style>
