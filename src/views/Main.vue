<template>
	<div class="py-7 min-h-screen" :class="themeStore.theme">
		<div class="header container">
			<TheHeader />
		</div>
		<div class="main container">
			<Filters />
			<Week />
			<MenuBar />
		</div>
	</div>
</template>

<script setup lang="ts">
import Filters from '@/components/pages/main/Filters.vue'
import TheHeader from '@/components/pages/main/TheHeader.vue'
import Week from '@/components/pages/main/Week/index.vue'
import MenuBar from '@/components/ui/MenuBar.vue'
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'
</style>
