<template>
	<div
		class="filters pb-5 flex flex-col justify-center md:pb-11 md:items-center md:flex-row gap-5"
	>
		<AppInput
			class="flex-1"
			v-model="dataStore.filters.teacher"
			:options="teachers"
			placeholder="Введите преподавателя"
			input-type="search"
		/>
		<AppInput
			class="flex-1"
			v-model="dataStore.filters.groupName"
			:options="groupNames"
			placeholder="Введите группу"
			input-type="search"
		/>
		<AppSelect
			class="flex-1"
			v-model="dataStore.filters.groupWeek"
			text="Неделя"
			placeholder="Неделя"
			:options="[1, 2]"
		></AppSelect>
	</div>
</template>

<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import { useDataStore, useFiltersStore } from '@/stores'
import { computed, onMounted } from 'vue'

const filtersStore = useFiltersStore()
const dataStore = useDataStore()

const teachers = computed(() => {
	const filteredSchedulesInUser = dataStore.schedules.filter(schedule =>
		schedule.hours.find(
			hour =>
				!dataStore.filters.groupName ||
				hour.group === dataStore.filters.groupName
		)
	)
	const teachers = dataStore.teachers.filter(teacher =>
		filteredSchedulesInUser.find(schedule => teacher.id === schedule.id)
	)

	return teachers.map(teacher => teacher.teacher)
})
const groupNames = computed(() => filtersStore.groupNames)
onMounted(async () => {
	await dataStore.fetchTeachers()
	dataStore.fetchSchedules()
})
</script>

<style scoped></style>
