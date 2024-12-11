<template>
	<div
		class="filters pb-5 flex flex-col justify-center md:pb-11 md:items-center md:flex-row gap-5"
	>
		<AppInput
			class="flex-1"
			v-model="dataStore.filters.teacher"
			:options="teachers"
			placeholder="Введите преподавателя"
		/>
		<AppInput
			class="flex-1"
			v-model="dataStore.filters.groupName"
			:options="groupNames"
			placeholder="Введите группу"
		/>
		<AppSelect
			class="flex-1"
			v-model="dataStore.filters.groupWeek"
			:options="[1, 2]"
		></AppSelect>
	</div>
</template>

<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'

const dataStore = useDataStore()

const teachers = computed((): string[] => [
	...new Set(
		dataStore.filteredSubjects
			.map(subject => subject.teacher)
			.filter(teacher => teacher && teacher !== 'уточнить')
	),
])

const groupNames = computed((): string[] => {
	const groups = new Set()

	dataStore.filteredSubjects.forEach(subject => {
		subject.shadules.forEach(shadule => {
			shadule.hours.forEach(hour => {
				if (hour.group) {
					groups.add(hour.group)
				}
			})
		})
	})

	return [...groups] as string[]
})
</script>

<style scoped></style>
