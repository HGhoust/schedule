<template>
	<div class="relative">
		<!-- верхняя панель -->
		<div
			v-if="isMenuVisible"
			:style="menuPosition"
			:class="themeStore.theme"
			class="top-menu bottom-28 p-2 lg:p-3 shadow-md z-20 min-w-min rounded-3xl"
		>
			<div class="flex flex-col min-w-max">
				<div
					class="flex flex-col items-center gap-3"
					v-for="option in menuOptions"
					:key="option.label"
				>
					<button
						@click="handleClickTop(option.action)"
						class="top-menu__button relative flex items-center justify-between gap-3 pr-7 py-2 px-2 rounded-2xl"
						v-if="
							option?.visible === dataStore.user?.role ||
							option.visible === 'user'
						"
					>
						<img
							:src="
								themeStore.theme === 'light'
									? option.icon
									: option.iconDark || option.icon
							"
							:alt="option.label"
							class="size-7 lg:size-9"
						/>

						<span class="text-xs lg:text-sm">
							{{ option.label }}
						</span>
						<img
							src="/src/assets/icons/online.svg"
							alt=""
							class="absolute right-2 top-1/2 transform -translate-y-1/2 size-3"
							v-if="themeStore.theme === option.action"
						/>
					</button>
				</div>
			</div>
			<div
				:class="themeStore.theme"
				class="top-menu__pointer fixed -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 z-10"
			></div>
		</div>

		<!-- нижняя панель -->
		<div
			class="bottom-menu fixed bottom-5 right-1/2 transform translate-x-1/2 min-w-max flex-col items-center py-2 px-4 rounded-3xl shadow-md"
		>
			<div class="flex justify-between w-full" ref="selectRef">
				<div v-for="(action, index) in mainActions" :key="action.label">
					<button
						@click="handleClickMain(action.action)"
						class="bottom-menu__button flex items-center justify-center p-3 rounded-full xl:hover:bg-gray-300 transition duration-200 mr-4"
						:class="[mainActions.length === index + 1 ? 'last:mr-0' : '']"
						v-if="action?.visible !== route.path"
					>
						<div
							class="bottom-menu__separator absolute right-14 w-0.5 h-9 mr-3"
							v-if="action.action === 'exit'"
						></div>
						<img
							:src="
								themeStore.theme === 'light' ? action.icon : action.iconDark
							"
							:alt="action.label"
							class="w-6 h-6"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { useDataStore, useThemeStore } from '@/stores'
import { getAuth, signOut } from 'firebase/auth'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

interface MenuOption {
	label: string
	action: string
	icon?: string
	iconDark?: string
	visible?: string
}

interface MainAction {
	label: string
	action: string
	icon: string
	iconDark?: string
	visible?: string
}

const menuOptions = ref<MenuOption[]>([])
const themeStore = useThemeStore()
const dataStore = useDataStore()
const route = useRoute()

const menuThemeOptions = ref<MenuOption[]>([
	{
		label: 'Темная тема',
		action: 'dark',
		icon: '/src/assets/icons/darkBlack.svg',
		iconDark: '/src/assets/icons/darkWhite.svg',
		visible: 'user',
	},
	{
		label: 'Светлая тема',
		action: 'light',
		icon: '/src/assets/icons/lightBlack.svg',
		iconDark: '/src/assets/icons/lightWhite.svg',
		visible: 'user',
	},
])

const menuSettingsOptions = ref<MenuOption[]>([
	{
		label: 'Список преподавателей',
		action: 'teachers',
		icon: '/src/assets/icons/womanTeacherLight.svg',
		iconDark: '/src/assets/icons/womanTeacherDark.svg',
		visible: 'user',
	},
	{
		label: 'Список пользователей',
		action: 'users',
		icon: '/src/assets/icons/usersLight.svg',
		iconDark: '/src/assets/icons/usersDark.svg',
		visible: 'admin',
	},
])

const mainActions = reactive<MainAction[]>([
	{
		label: 'Back',
		action: 'back',
		icon: '/src/assets/icons/backLight.svg',
		iconDark: '/src/assets/icons/backDark.svg',
		visible: '/',
	},
	{
		label: 'Settings',
		action: 'settings',
		icon: '/src/assets/icons/settingsLight.svg',
		iconDark: '/src/assets/icons/settingsDark.svg',
	},
	{
		label: 'Theme',
		action: 'themeSettings',
		icon: '/src/assets/icons/themeSettingsLight.svg',
		iconDark: '/src/assets/icons/themeSettingsDark.svg',
	},
	{
		label: 'Exit',
		action: 'exit',
		icon: '/src/assets/icons/exitLight.svg',
		iconDark: '/src/assets/icons/exitDark.svg',
	},
])

const isMenuVisible = ref(false)

const menuPosition = ref({})

const selectRef = ref<null | HTMLElement>(null)

const toggleMenu = (event: MouseEvent) => {
	const buttonRect = (
		event.currentTarget as HTMLElement
	)?.getBoundingClientRect()

	menuPosition.value = {
		left: `${buttonRect.left + buttonRect.width / 2}px`,
		transform: 'translate(-50%, 0)',
		position: 'fixed',
	}

	isMenuVisible.value = !isMenuVisible.value
}

const userSignOut = async (): Promise<void> => {
	await signOut(getAuth())
	router.replace('/Login')
}

const handleClickTop = (action: string) => {
	switch (action) {
		case 'light':
			themeStore.selectLightTheme()
			isMenuVisible.value = false
			break
		case 'dark':
			themeStore.selectDarkTheme()
			isMenuVisible.value = false
			break
		case 'teachers':
			router.push('/Teachers')
			isMenuVisible.value = false
			break
		case 'users':
			router.push('/Users')
			isMenuVisible.value = false
			break
		default:
			console.log('Unknown action:', action)
	}
}
const handleClickMain = (action: string) => {
	switch (action) {
		case 'exit':
			userSignOut()
			break
		case 'themeSettings':
			toggleMenu(event as MouseEvent)
			menuOptions.value = menuThemeOptions.value
			break
		case 'settings':
			toggleMenu(event as MouseEvent)
			menuOptions.value = menuSettingsOptions.value
			break
		case 'back':
			router.back()
			break
		default:
			console.log('Unknown action:', action)
	}
}

const handleClickOutside = (event: MouseEvent): void => {
	if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
		isMenuVisible.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.light
	stroke: #000
	.top-menu
		background: variables.$bgCardWhite

		&__pointer
			background-color: variables.$bgCardWhite

		&__button
			&:hover
				background: variables.$bgButtonWhite

	.bottom-menu
		background: variables.$bgCardWhite

		&__separator
			background-color: variables.$bgCardBlack

		&__button
			&:hover
				background: variables.$bgButtonWhite

.dark
	stroke: #fff
	.top-menu
		background: variables.$bgCardBlack

		&__pointer
			background: variables.$bgCardBlack

		&__button
			&:hover
				background: variables.$bgButtonBlack

	.bottom-menu
		background: variables.$bgCardBlack

		&__separator
			background: variables.$bgCardWhite

		&__button
			&:hover
				background: variables.$bgButtonBlack

.fade-in
	animation: fadeIn 0.2s ease-out

@keyframes fadeIn
	from
		opacity: 0
		transform: scale(0.95)

	to
		opacity: 1
		transform: scale(1)
</style>
