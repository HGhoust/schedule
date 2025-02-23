<template>
	<div
		class="week grid gap-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-32"
	>
		<DayCard
			v-for="(dayInf, index) in currentWeek"
			:key="dayInf.day"
			:index="index"
			:day="dayInf.day"
			:date="dayInf.date"
		/>
	</div>
</template>

<script setup lang="ts">
import { getCurrentWeek } from '@/composables'
import DayCard from './DayCard.vue'

const currentWeek = getCurrentWeek()
</script>

<style lang="sass" scoped></style>
