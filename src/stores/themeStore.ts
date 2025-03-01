import type { IThemeState } from '@/types/store'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', {
	state: (): IThemeState => {
		return {
			theme: '',
			systemTheme: '',
			prefersDark: window.matchMedia('(prefers-color-scheme: dark'),
		}
	},

	actions: {
		updateThemeColor(): void {
			const metaThemeColor = document.querySelector('meta[name="theme-color"]')
			if (metaThemeColor) {
				metaThemeColor.setAttribute(
					'content',
					this.theme === 'dark' ? '#2d2d2d' : '#ffffff'
				)
			}
		},
		toggleTheme(): void {
			this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light')
			localStorage.setItem('theme', this.theme)
			this.updateThemeColor()
		},

		selectLightTheme(): void {
			this.theme = 'light'
			localStorage.setItem('theme', this.theme)
			this.updateThemeColor()
		},

		selectDarkTheme(): void {
			this.theme = 'dark'
			localStorage.setItem('theme', this.theme)
			this.updateThemeColor()
		},

		updateTheme(): void {
			this.systemTheme = this.prefersDark.matches ? 'dark' : 'light'
			this.theme = this.theme || this.systemTheme
			this.updateThemeColor()
		},
	},

	getters: {},
})
