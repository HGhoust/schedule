<template>
	<div class="card rounded-md" :class="themeStore.theme">
		<div class="flex flex-col justify-center min-h-24">
			<h2 class="text-center">{{ day }}</h2>
			<h2 class="text-center">{{ date }}</h2>
		</div>
		<ul class="flex flex-col">
			<li
				class="px-3"
				v-for="item in dataStore.getDayHours(index)"
				:key="item.positionHour"
			>
				<div class="list-info flex items-center min-h-24" v-if="item.subject">
					<span class="min-w-10">{{ item.positionHour }}</span>
					<div class="flex flex-col flex-1">
						<span class="">{{ item.subject.name }}</span>
						<span class="text-xs"
							>Преподаватель {{ item.subject.teacher }}</span
						>
						<span class="text-xs"
							>Кабинет {{ item.subject.shadule.hour.room }}</span
						>
					</div>
				</div>
				<div class="list-info flex items-center min-h-24" v-else>
					<span class="min-w-10">{{ item.positionHour }}</span>
					<span>Нет пар</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useDataStore, useThemeStore } from '@/stores'
const props = defineProps({
	index: {
		type: Number,
		required: true,
	},
	day: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: false,
	},
})
const themeStore = useThemeStore()
const dataStore = useDataStore()
</script>

<style lang="sass" scoped>
@use '/src/assets/styles/variables.sass'

.card
	border: 1px solid

.dark
	border: 2px solid

.card
	min-height: 450px
	border-color: variables.$textDarkBlue

.list-info
	grid-template-columns: 1fr 7fr
</style>
