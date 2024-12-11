import { defineStore } from 'pinia'

interface IThemeState {
	theme: string
	systemTheme: string
	prefersDark: MediaQueryList
}

export const useThemeStore = defineStore('themeStore', {
	state: (): IThemeState => {
		return {
			theme: '',
			systemTheme: '',
			prefersDark: window.matchMedia('(prefers-color-scheme: dark'),
		}
	},

	actions: {
		toggleTheme(): void {
			this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light')
			localStorage.setItem('theme', this.theme)
		},

		updateTheme(): void {
			this.systemTheme = this.prefersDark.matches ? 'dark' : 'light'
			this.theme = this.theme || this.systemTheme
		},
	},

	getters: {},
})
