<template>
	<div class="py-7 min-h-screen" :class="themeStore.theme">
		<Sidebar v-if="aside" />
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
import Sidebar from '@/components/pages/main/Sidebar.vue'
import TheHeader from '@/components/pages/main/TheHeader.vue'
import Week from '@/components/pages/main/Week.vue'
import { useThemeStore } from '@/stores'
import { provide, ref } from 'vue'

const themeStore = useThemeStore()
const aside = ref<boolean>(false)

provide('aside', aside)
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'
</style>
