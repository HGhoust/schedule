<template>
	<div :class="themeStore.theme">
		<div class="container py-5 pb-32">
			<h1 class="text-center text-2xl py-5">Список преподавателей</h1>
			<div class="filters grid grid-cols lg:flex gap-5">
				<AppInput
					class="flex-1"
					v-model="teacher"
					:options="
						dataStore.user?.role === 'admin'
							? dataStore.teachers.map(teacher => teacher.teacher)
							: filteredTeachersInUser.map(teacher => teacher.teacher)
					"
					placeholder="Введите преподавателя"
					input-type="search"
				/>
				<AppInput
					class="flex-1"
					v-model="name"
					:options="filteredSubjectName"
					placeholder="Введите название предмета"
					input-type="search"
				/>
			</div>
			<form
				class="min-h-screen pt-14 px-2 flex flex-col gap-5"
				action=""
				@submit.prevent="saveChanges"
				@keydown.enter="saveChanges"
			>
				<!-- Список преподавателей -->
				<div
					class="grid grid-cols-1 sm:grid-cols-2 gap-7"
					v-if="filteredTeachers.length"
				>
					<div
						class="teacher relative rounded-3xl p-5 lg:p-11"
						:class="themeStore.theme"
						v-for="(subjects, subjectId) in dataStore.user?.role !== 'admin'
							? filteredTeachersInUser
							: filteredTeachers"
						:key="subjectId + subjects.id"
					>
						<button
							type="button"
							:class="themeStore.theme"
							class="button--delete absolute right-7 top-7 lg:right-9 lg:top-9 p-2 rounded-full"
							@click="confirmDeletion(subjects.id)"
						>
							<img
								:src="`/icons/${
									themeStore.theme === 'light' ? 'deleteBlack' : 'deleteWhite'
								}.svg`"
								alt=""
								class="size-9"
							/>
						</button>
						<!-- Информация о преподавателе -->
						<div class="grid grid-cols-1 items-center gap-3 pb-5 mt-11 lg:mt-0">
							<img
								:src="`/icons/${addDefaultImage[subjectId]}Teacher${
									themeStore.theme[0].toUpperCase() + themeStore.theme.slice(1)
								}.svg`"
								alt=""
								class="size-28 rounded-full mx-auto lg:mx-0"
							/>
							<div class="flex-1">
								<label for="button" class="block text-sm font-medium my-2 ml-3">
									Преподаватель
								</label>
								<AppInput
									id="button"
									v-model="subjects.teacher"
									placeholder="Имя преподавателя"
								/>
							</div>
							<div class="flex-1">
								<label for="button" class="block text-sm font-medium mb-2 ml-3">
									Название предмета
								</label>
								<AppInput
									id="button"
									placeholder="Название предмета"
									v-model="subjects.name"
								/>
							</div>
						</div>
						<AppButton
							text="Редактировать занятии"
							@click="
								router.push({
									name: 'teachers-lesson',
									params: { id: subjects.id },
								})
							"
						/>
					</div>
				</div>

				<div class="" v-else>
					<h3 class="text-center text-xl">Список преподавателей пуст</h3>
				</div>

				<AppAlert
					v-if="showModal"
					@close="closeModal"
					@confirm="deleteObjectsWithMatchingId(selectedTeacherId)"
				/>

				<div class="grid grid-cols-1 gap-7 sm:flex lg:gap-9 mt-5">
					<AppButton
						button-type="button"
						text="Добавить преподавателя"
						class="w-full lg:w-1/2"
						@click="addTeacher"
					/>
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
import MenuBar from '@/components/ui/MenuBar.vue'
import {
	useDataStore,
	useFiltersStore,
	UseModalWindowStore,
	useThemeStore,
} from '@/stores'
import type { IScheduleList, ITeacherList } from '@/types/date'
import {
	ref as dataBaseRef,
	get,
	getDatabase,
	push,
	remove,
	update,
} from 'firebase/database'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const dataStore = useDataStore()
const filtersStore = useFiltersStore()
const themeStore = useThemeStore()
const modalWindowStore = UseModalWindowStore()
const router = useRouter()

const showModal = ref<boolean>(false)

const name = ref<string>('')
const teacher = ref<string>('')
const selectedTeacherId = ref<string>('')

const dataBase = getDatabase()

const saveChanges = async (): Promise<void> => {
	const updates: Record<string, Partial<ITeacherList>> = {}

	dataStore.teachers.forEach(subject => {
		updates[`subjects/${subject.key}`] = {
			teacher: subject.teacher,
			name: subject.name,
			id: subject.id,
		}
	})

	try {
		await update(dataBaseRef(dataBase), updates)
		modalWindowStore.text = 'Изменения успешно сохранены'
		modalWindowStore.visible = true
	} catch (error) {
		console.error('Ошибка при обновлении данных', error)
	}
}

const confirmDeletion = (teacherId: string) => {
	showModal.value = true
	selectedTeacherId.value = teacherId
}

const closeModal = () => {
	showModal.value = false
	selectedTeacherId.value = ''
}

const deleteObjectsWithMatchingId = async (targetId: string) => {
	try {
		showModal.value = false
		dataStore.isLoading = true
		const subjectsRef = dataBaseRef(dataBase, 'subjects')
		const subjectsSnapshot = await get(subjectsRef)
		const subjectsData = subjectsSnapshot.val()

		if (subjectsData) {
			const subjectKey = Object.keys(subjectsData).find(
				key => subjectsData[key]?.id === targetId
			)
			if (subjectKey) {
				await remove(dataBaseRef(dataBase, `subjects/${subjectKey}`))
				console.log(`Объект удалён из "subjects": ${subjectKey}`)
			}
		}

		const schedulesRef = dataBaseRef(dataBase, 'schedules')
		const schedulesSnapshot = await get(schedulesRef)
		const schedulesData = schedulesSnapshot.val()

		if (schedulesData) {
			const scheduleKey = Object.keys(schedulesData).find(key =>
				schedulesData[key]?.find((item: IScheduleList) => item.id === targetId)
			)
			if (scheduleKey) {
				await remove(dataBaseRef(dataBase, `schedules/${scheduleKey}`))
				console.log(`Объект удалён из "schedules": ${scheduleKey}`)
			}
		}
		await dataStore.fetchTeachers()
		console.log(`Объекты с ID "${targetId}" успешно удалены.`)
	} catch (error) {
		console.error('Ошибка при удалении объектов:', error)
	} finally {
		dataStore.isLoading = false
	}
}

const addTeacher = async () => {
	const newTeacherRef = dataBaseRef(dataBase, 'subjects')
	try {
		dataStore.isLoading = true
		await push(newTeacherRef, {
			teacher: '',
			name: '',
			id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
		})
		await dataStore.fetchTeachers()
	} catch (error) {
		console.error('Ошибка при добавлении преподавателя', error)
	} finally {
		dataStore.isLoading = false
	}
}

const filteredTeachers = computed(() => {
	return dataStore.teachers.filter(teachers => {
		const matchesTeacher =
			!teacher.value ||
			teachers.teacher.toLowerCase().includes(teacher.value.toLowerCase())
		const matchesSubjectName =
			!name.value ||
			teachers.name.toLowerCase().includes(name.value.toLowerCase())

		return matchesTeacher && matchesSubjectName
	})
})

const filteredTeachersInUser = computed(() => {
	const filteredSchedulesInUser = dataStore.schedules.filter(schedule =>
		schedule.hours.find(hour => hour.group === dataStore.user?.group)
	)
	return filteredTeachers.value.filter(
		teacher =>
			filteredSchedulesInUser.find(schedule => schedule.id === teacher.id) ||
			true
	)
})

const filteredSubjectName = computed(() => {
	return [...new Set(dataStore.teachers.map(teacher => teacher.name))].filter(
		subjectName =>
			!name.value ||
			subjectName.toLocaleLowerCase().includes(name.value.toLocaleLowerCase())
	)
})

const addDefaultImage = computed(() => {
	return dataStore.teachers.map(element => {
		let surname = element.teacher?.split(' ')[0]
		return surname
			? surname[surname?.length - 1] === 'а'
				? 'woman'
				: 'man'
			: ''
	})
})

onMounted(async () => {
	try {
		dataStore.isLoading = true
		await dataStore.fetchTeachers()
		dataStore.fetchSchedules()
		dataStore.getAuthUser()
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
	.teacher
		background-color: variables.$bgCardBlack
		box-shadow: 5px 5px 20px 0px #1e1e1e

	.button
		&--delete
			background: none
			&:hover
				background-color: variables.$bgButtonBlack

.light
	.teacher
		background-color: variables.$bgCardWhite
		box-shadow: 5px 5px 20px 0px #CACACC

	.button
		&--delete
			background: none
			&:hover
				background-color: variables.$bgButtonWhite
</style>
