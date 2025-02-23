import type { IFiltersState } from '@/types/store/filtersStore'
import { defineStore } from 'pinia'
import { useDataStore } from './dataStore'

export const useFiltersStore = defineStore('filtersStore', {
	state: (): IFiltersState => {
		return {
			dataStore: useDataStore(),
		}
	},
	getters: {
		groupNames(): string[] {
			const groups = new Set()

			this.dataStore.filteredSubjects.forEach(subject => {
				subject.schedules?.forEach(schedule => {
					schedule.hours?.forEach(hour => {
						if (hour.group) {
							groups.add(hour.group)
						}
					})
				})
			})

			return [...groups] as string[]
		},

		teachers(): string[] {
			return [
				...new Set(
					this.dataStore.teachers
						.map(subject => subject.teacher)
						.filter(teacher => teacher && teacher !== 'уточнить')
				),
			]
		},
	},
})
