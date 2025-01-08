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
			:options="[1, 2]"
		></AppSelect>
	</div>
</template>

<script setup lang="ts">
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import { useDataStore, useFiltersStore } from '@/stores'
import { computed } from 'vue'

const filtersStore = useFiltersStore()
const dataStore = useDataStore()

const teachers = computed(() => filtersStore.teachers)
const groupNames = computed(() => filtersStore.groupNames)
</script>

<style scoped></style>
