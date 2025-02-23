import type { IModalWindowState } from '@/types/store'
import { defineStore } from 'pinia'

export const UseModalWindowStore = defineStore('modalWindowStore', {
	state: (): IModalWindowState => ({
		visible: false,
		text: '',
		type: 'accept',
		time: 3000,
		errorMessage: '',
	}),
})
