<template>
	<Auth
		submit-text="Зарегистрироваться"
		submit-title="Регистрация"
		@submit="signUp"
	>
		<template #title>
			<h1>Регистрация</h1>
		</template>

		<template #inputs>
			<div class="">
				<AppInput
					placeholder="Введите имя"
					input-type="text"
					v-model="userStore.userName"
				/>
				<span
					class="text-red-700 pl-3"
					v-if="userStore.userName && userStore.userName.length <= 3"
					>Имя должно быть больше 3 букв</span
				>
			</div>
			<div class="">
				<AppInput
					placeholder="Введите свою группу (обязательно)"
					input-type="text"
					v-model="userStore.userGroup"
				/>
				<span
					class="text-red-700 pl-3"
					v-if="userStore.userGroup && userStore.userGroup.length <= 3"
					>Название группы не должно быть менее 4 символов</span
				>
			</div>
			<AppSelect
				placeholder="Пол •"
				v-model="userStore.userGender"
				:options="['Мужской', 'Женский']"
			/>
			<div class="">
				<AppInput
					placeholder="Введите почту"
					input-type="email"
					v-model="userStore.email"
				/>
				<span
					class="text-red-700 pl-3"
					v-if="
						modalWindowStore.errorMessage ===
						'Пользователь с такой почтой не найден'
					"
					>Пользователь с такой почтой не найден</span
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
					v-if="userStore.password !== userStore.passwordConfirm"
					>Пароли не совпадают</span
				>
			</div>
			<div class="">
				<AppInput
					placeholder="Подтвердите пароль"
					input-type="password"
					:password="true"
					v-model="userStore.passwordConfirm"
				/>
				<span
					class="text-red-700 pl-3"
					v-if="userStore.password !== userStore.passwordConfirm"
					>Пароли не совпадают</span
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
import AppSelect from '@/components/ui/AppSelect.vue'
import { useDataStore, UseModalWindowStore } from '@/stores'
import { useUserStore } from '@/stores/userStore'
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
	getAuth,
	sendEmailVerification,
} from 'firebase/auth'
import { ref as dataBaseRef, getDatabase, set } from 'firebase/database'
import { useRouter } from 'vue-router'
import Auth from './index.vue'

const dataStore = useDataStore()
const modalWindowStore = UseModalWindowStore()
const userStore = useUserStore()

const router = useRouter()

const signUp = async (): Promise<void> => {
	try {
		dataStore.isLoading = true
		// проверка существовании почты в бд fb
		const signInMethod = await fetchSignInMethodsForEmail(
			getAuth(),
			userStore.email.trim().toLowerCase()
		)

		if (signInMethod.length > 0) {
			modalWindowStore.text = 'Такая почта уже зарегистрирована'
			modalWindowStore.visible = true
			modalWindowStore.type = 'error'
			dataStore.isLoading = false
			return
		}

		const userCredential = await createUserWithEmailAndPassword(
			getAuth(),
			userStore.email,
			userStore.password
		)
		const user = userCredential.user
		const db = getDatabase()

		await set(dataBaseRef(db, 'users/' + user.uid), {
			email: user.email?.toLowerCase(),
			name: userStore.userName,
			role: 'user',
			createdAt: Date.now(),
			gender: userStore.userGender,
			password: userStore.password,
			group: userStore.userGroup,
			uid: user.uid,
		})
		await sendEmailVerification(user)
		console.log('письмо отправлено на почту')

		userStore.userName = ''
		userStore.userGender = 'Мужской'
		userStore.password = ''
		userStore.passwordConfirm = ''
		userStore.email = ''

		modalWindowStore.errorMessage = ''

		modalWindowStore.text =
			'Регистрация прошла успешно, что-бы войти необходимо подтвердить почту, вы можете подтвердить почту перейдя через ссылку отправленной на почту письмом!'
		modalWindowStore.visible = true
		modalWindowStore.time = 5000
		router.push('/Login')
		console.log('пользователь зарегистрирован', user)
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(error.message)
		}
	} finally {
		dataStore.isLoading = false
	}
}
</script>

<style scoped></style>
