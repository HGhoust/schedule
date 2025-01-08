import { defineStore } from 'pinia'
import { useDataStore } from './dataStore'
type DataStoreType = ReturnType<typeof useDataStore>

interface IFiltersState {
	dataStore: DataStoreType
}

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
				subject.schedules.forEach(schedule => {
					schedule.hours.forEach(hour => {
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
					this.dataStore.filteredSubjects
						.map(subject => subject.teacher)
						.filter(teacher => teacher && teacher !== 'уточнить')
				),
			]
		},
	},
})
