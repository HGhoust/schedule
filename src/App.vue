<template>
	<RouterView />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useThemeStore } from './stores'

const themeStore = useThemeStore()

onMounted(() => {
	const savedTheme = localStorage.getItem('theme')

	themeStore.prefersDark.addEventListener('change', themeStore.updateTheme)

	if (savedTheme) {
		themeStore.theme = savedTheme
	} else {
		themeStore.updateTheme()
	}

	console.log(themeStore.theme)
})

onUnmounted(() => {
	themeStore.prefersDark.removeEventListener('change', themeStore.updateTheme)
})
</script>
