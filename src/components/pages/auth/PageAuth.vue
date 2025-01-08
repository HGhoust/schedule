<template>
	<div class="main relative h-screen" :class="themeStore.theme">
		<div
			class="wrapper h-screen w-full absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10"
		>
			<AppThemeButton class="absolute top-4 right-4" />
			<form
				action=""
				class="px-5 py-5 flex flex-col justify-center gap-5 h-full"
				@submit.prevent=""
			>
				<h1 class="text-center text-2xl">{{ titleText }}</h1>
				<AppInput
					placeholder="Введите почту"
					input-type="email"
					v-model="email"
					v-if="!isLogin"
				/>
				<AppInput
					placeholder="Введите номер"
					input-type="tel"
					v-model="number"
				/>
				<AppInput
					placeholder="Введите пароль"
					input-type="password"
					:password="true"
					v-model="password"
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
import { computed, ref } from 'vue'

const themeStore = useThemeStore()
const isLogin = ref<boolean>(true)
const number = ref('')
const password = ref('')
const email = ref<string>('')

const isFilled = computed<boolean>(() =>
	isLogin.value
		? !number.value || !password.value
		: !number.value || !password.value || !email.value
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
