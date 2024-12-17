<template>
	<div class="py-7 min-h-screen" :class="themeStore.theme">
		<div class="header container">
			<TheHeader />
		</div>
		<div class="main container">
			<Filters />
			<Week v-if="true" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Filters from '@/components/pages/main/Filters.vue'
import TheHeader from '@/components/pages/main/TheHeader.vue'
import Week from '@/components/pages/main/Week.vue'
import { useThemeStore } from '@/stores'
import { onMounted, onUnmounted } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
	const savedTheme = localStorage.getItem('theme')

	themeStore.prefersDark.addEventListener('change', themeStore.updateTheme)

	if (savedTheme) {
		themeStore.theme = savedTheme
	} else {
		themeStore.updateTheme()
	}
})

onUnmounted(() => {
	themeStore.prefersDark.removeEventListener('change', themeStore.updateTheme)
})
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'
</style>
