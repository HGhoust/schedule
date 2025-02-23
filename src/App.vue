<template>
	<RouterView />
	<ScrollButton :scroll-value="scrollValue" />
	<Loader :visible="dataStore.isLoading" />
	<Toast
		:type="modalWindowStore.type"
		:text="modalWindowStore.text"
		:time="modalWindowStore.time"
		v-if="modalWindowStore.visible"
	/>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Loader from './components/ui/Loader.vue'
import ScrollButton from './components/ui/ScrollButton.vue'
import Toast from './components/ui/Toast.vue'
import { useDataStore, UseModalWindowStore, useThemeStore } from './stores'

const themeStore = useThemeStore()
const dataStore = useDataStore()
const modalWindowStore = UseModalWindowStore()

const scrollValue = ref(0)

//firefox не поддерживает прокрутки body
const updateScroll = () => {
	scrollValue.value = window.scrollY || document.body.scrollTop
}

onMounted(() => {
	window.scrollY
		? window.addEventListener('scroll', updateScroll)
		: document.body.addEventListener('scroll', updateScroll)

	const savedTheme = localStorage.getItem('theme')

	themeStore.prefersDark.addEventListener('change', themeStore.updateTheme)

	savedTheme ? (themeStore.theme = savedTheme) : themeStore.updateTheme()
})

onUnmounted(() => {
	window.scrollY
		? window.removeEventListener('scroll', updateScroll)
		: document.body.removeEventListener('scroll', updateScroll)

	themeStore.prefersDark.removeEventListener('change', themeStore.updateTheme)
})
</script>
