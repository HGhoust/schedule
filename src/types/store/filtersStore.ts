import type { useDataStore } from '@/stores'

type DataStoreType = ReturnType<typeof useDataStore>

export interface IFiltersState {
	dataStore: DataStoreType
}
