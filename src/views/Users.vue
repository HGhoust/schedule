<template>
	<div :class="themeStore.theme">
		<div class="container py-5 pb-32">
			<h1 class="text-center text-2xl py-5">Список пользователей</h1>
			<div class="filters grid grid-cols lg:flex gap-5">
				<AppInput
					class="flex-1"
					v-model="userName"
					:options="dataStore.users.map(user => user.name)"
					placeholder="Введите пользователя"
					input-type="search"
				/>
				<AppInput
					class="flex-1"
					v-model="userRole"
					:options="dataStore.users.map(user => user.role)"
					placeholder="Введите роль"
					input-type="search"
				/>
			</div>
			<form
				class="min-h-screen pt-14 px-2 flex flex-col gap-5"
				action=""
				@submit.prevent="saveChanges"
			>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 gap-7"
					v-if="filteredUsers.length"
				>
					<div
						class="user relative rounded-3xl p-5 lg:p-11"
						:class="themeStore.theme"
						v-for="(user, usersId) in filteredUsers"
						:key="usersId"
					>
						<button
							type="button"
							:class="themeStore.theme"
							class="button--delete absolute right-7 top-7 lg:right-9 lg:top-9 p-2 rounded-full"
							@click="confirmDeletion(user.uId, user.name)"
						>
							<img
								:src="`/src/assets/icons/${
									themeStore.theme === 'light' ? 'deleteBlack' : 'deleteWhite'
								}.svg`"
								alt=""
								class="size-9"
							/>
						</button>
						<div class="grid grid-cols-1 items-center gap-3 pb-5 mt-11 lg:mt-0">
							<img
								:src="`/src/assets/icons/${addDefaultImage[usersId]}Teacher${
									themeStore.theme[0].toUpperCase() + themeStore.theme.slice(1)
								}.svg`"
								alt=""
								class="size-28 rounded-full mx-auto lg:mx-0"
							/>
							<div class="flex-1">
								<label for="button" class="block text-sm font-medium my-2 ml-3">
									Пользователь
								</label>
								<AppInput
									id="button"
									v-model="user.name"
									placeholder="Имя пользователя"
								/>
							</div>
							<div class="flex-1">
								<label for="button" class="block text-sm font-medium my-2 ml-3">
									Почта
								</label>
								<AppInput id="button" v-model="user.email" />
							</div>
							<div class="flex-1">
								<label for="button" class="block text-sm font-medium mb-2 ml-3">
									Роль
								</label>
								<AppSelect
									id="button"
									v-model="user.role"
									:options="['admin', 'user']"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="" v-else>
					<h3 class="text-center text-xl">Список пользователей пуст</h3>
				</div>

				<AppAlert
					v-if="showModal"
					@close="closeModal"
					@confirm="deleteObjectsWithMatchingId(selectedUserId)"
				/>

				<div class="grid grid-cols-1 gap-7 sm:flex lg:gap-9 mt-5">
					<AppButton
						button-type="submit"
						text="Сохранить изменения"
						color="submit"
						class="w-full lg:w-1/2"
					/>
				</div>
			</form>
			<MenuBar />
		</div>
	</div>
</template>

<script setup lang="ts">
import AppAlert from '@/components/ui/AppAlert.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import MenuBar from '@/components/ui/MenuBar.vue'
import { useDataStore, UseModalWindowStore, useThemeStore } from '@/stores'
import type { IUser } from '@/types/date'
import { deleteUser, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
	ref as dataBaseRef,
	get,
	getDatabase,
	remove,
	update,
} from 'firebase/database'
import { computed, onMounted, ref } from 'vue'

const dataStore = useDataStore()
const themeStore = useThemeStore()
const modalWindowStore = UseModalWindowStore()

const showModal = ref<boolean>(false)

const userRole = ref<string>('')
const userName = ref<string>('')
const selectedUserId = ref<string>('')
const selectedUserName = ref<string>('')
const currentUserEmail = ref<string>('')
const currentUserPassword = ref<string>('')

const dataBase = getDatabase()

const saveChanges = async (): Promise<void> => {
	const updates: Record<string, Partial<IUser>> = {}

	dataStore.users.forEach(user => {
		updates[`users/${user.uId}`] = {
			name: user.name,
			email: user.email,
			role: user.role,
			password: user.password,
			createdAt: user.createdAt,
			uId: user.uId,
			gender: user.gender,
		}
	})

	try {
		await update(dataBaseRef(dataBase), updates)

		modalWindowStore.visible = true
		modalWindowStore.text = 'Изменения сохранены'
		console.log('Данные успешно обновлены')
	} catch (error) {
		console.error('Ошибка при обновлении данных', error)
	}
}

const confirmDeletion = (userId: string, userName: string) => {
	showModal.value = true
	selectedUserId.value = userId
	selectedUserName.value = userName
}

const closeModal = () => {
	showModal.value = false
	selectedUserId.value = ''
}
const deleteObjectsWithMatchingId = async (targetId: string) => {
	try {
		showModal.value = false

		const auth = getAuth()
		const currentUser = auth.currentUser

		// сохранение данных текущего пользователя перед удалением другого пользователя
		currentUserEmail.value = currentUser?.email || ''
		const usersRef = dataBaseRef(dataBase, 'users')
		const usersSnapshot = await get(usersRef)
		const usersData = usersSnapshot.val()

		// чтобы найти пароль текущего пользователя
		const currentUserKey = Object.keys(usersData || {}).find(
			key => usersData[key].email === currentUserEmail.value
		)
		currentUserPassword.value = currentUserKey
			? usersData[currentUserKey].password
			: ''

		if (usersData) {
			const userKey = Object.keys(usersData).find(key => key === targetId)
			if (userKey) {
				const emailToDelete = usersData[userKey].email
				const passwordToDelete = usersData[userKey].password

				// авторизация в удаляемый аккаунт, если это не текущий пользователь
				if (currentUserEmail.value !== emailToDelete) {
					const userCredential = await signInWithEmailAndPassword(
						auth,
						emailToDelete,
						passwordToDelete
					)
					await remove(dataBaseRef(dataBase, `users/${userKey}`))
					await deleteUser(userCredential.user)
					modalWindowStore.visible = true
					modalWindowStore.text = `Пользователь ${selectedUserName.value} удален`
				} else {
					await deleteUser(auth.currentUser!)
				}
			}
		}
	} catch (error) {
		console.error('Ошибка при удалении пользователя:', error)
	} finally {
		const auth = getAuth()

		// Если текущий пользователь был разлогинен, входим обратно
		if (
			!auth.currentUser &&
			currentUserEmail.value &&
			currentUserPassword.value
		) {
			await signInWithEmailAndPassword(
				auth,
				currentUserEmail.value,
				currentUserPassword.value
			)
			console.log(`Возвращение в аккаунт: ${currentUserEmail.value}`)
		}
	}
}

const filteredUsers = computed(() => {
	return dataStore.users.filter(user => {
		const matchesUserName =
			!userName.value ||
			user.name.toLowerCase().includes(userName.value.toLowerCase())
		const matchesUserRole =
			!userRole.value ||
			user.role.toLowerCase().includes(userRole.value.toLowerCase())

		return matchesUserName && matchesUserRole
	})
})

const addDefaultImage = computed(() => {
	return dataStore.users.map(element => {
		return element.gender === 'Женский' ? 'woman' : 'man'
	})
})

onMounted(async () => {
	try {
		dataStore.isLoading = true
		await dataStore.fetchUsers()
		await dataStore.fetchTeachers()
	} catch (error) {
		console.log(error)
	} finally {
		dataStore.isLoading = false
	}
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.dark
	.user
		background-color: variables.$bgCardBlack
		box-shadow: 5px 5px 20px 0px #1e1e1e

	.button
		&--delete
			background: none
			&:hover
				background-color: variables.$bgButtonBlack

.light
	.user
		background-color: variables.$bgCardWhite
		box-shadow: 5px 5px 20px 0px #CACACC

	.button
		&--delete
			background: none
			&:hover
				background-color: variables.$bgButtonWhite
</style>
